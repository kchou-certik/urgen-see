const db = require('../db');
const express = require('express');
const router = express.Router();

/**GET ALL/SOME route 
 * 
 * URL QUERY parameters (ALL OPTIONAL - parameters to narrow query):
 * - if none specified, defaults to ALL
 * 
 *  first_name: String - first name to search for
 *  last_name: String - last name to search for
 *  date_of_birth: String - DOB to search for
 *  mrn: String - MRN to search for
 * 
 * returns array of row objects, where each row has key=column name, value=data value
*/
router.get('/', (req, res) => {

    // IFNULL replaces the qualifier with True if the input is null
    // True essentially just ignores it
    const query = `SELECT mrn, last_name, first_name, date_of_birth,
    sex, Patients.phone_number, email, address_1, address_2, city, state,
    postal_code, insurance_policy, insurance_group, Patients.plan_ID, CONCAT(Carriers.provider, " ", Plans.name) AS plan_name 
    FROM Patients 
    LEFT JOIN Plans
    ON Patients.plan_ID = Plans.plan_ID
    LEFT JOIN Carriers
    ON Plans.carrier_ID = Carriers.carrier_ID
    WHERE IFNULL(first_name=?, True) 
    AND IFNULL(last_name=?, True) 
    AND IFNULL(date_of_birth=?, True) 
    AND IFNULL(mrn=?, True)
    ORDER BY last_name ASC;`;

    // build array of query parameters
    const paramArr = [
        req.query.first_name,
        req.query.last_name,
        req.query.date_of_birth,
        req.query.mrn
    ];

    // convert empty strings to null
    const inserts = paramArr.map((param) => param === '' ? null : param);

    // perform query, passing in query and inserts
    db.pool.query(
        query, inserts,
        (err, rows, fields) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(rows);
        });
});

/**GET ONE route
 * :id - MRN URL parameter
 * 
 * returns a single object where key=column name, value=data
 */
router.get('/:id', (req, res) => {
    const query = `SELECT mrn, last_name, first_name, date_of_birth,
    sex, Patients.phone_number, email, address_1, address_2, city, state,
    postal_code, insurance_policy, insurance_group, Patients.plan_ID, 
    CONCAT(Carriers.provider, " ", Plans.name) AS plan_name, Carriers.phone_number AS carrier_phone
    FROM Patients 
    LEFT JOIN Plans
    ON Patients.plan_ID = Plans.plan_ID
    LEFT JOIN Carriers
    ON Plans.carrier_ID = Carriers.carrier_ID
    WHERE mrn = ?
    ORDER BY last_name ASC;`

    // perform query, passing in query and ID
    db.pool.query(query, req.params.id, (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows[0]);  // SELECT returns an array; we only need the first result
    });
});

/**GET ALL Visits for ONE Patient route
 * :id - MRN URL parameter
 * 
 * returns array of row objects, where each row has key=column name, value=data value
 */
router.get('/:id/visits', (req, res) => {
    const mrn = req.params.id;

    const query =
        `SELECT visit_ID, CONCAT(last_name, ", ", first_name) AS patient_name, patient.mrn, scheduled_time, check_in_time, discharge_time,
        primary_diagnosis, visit_type, carrier.carrier_ID, plan.plan_ID, CONCAT(provider, " ", plan.name) AS visit_insurance
        FROM Visits 
        JOIN (SELECT last_name, first_name, mrn FROM Patients) AS patient
        ON patient.mrn = Visits.mrn
        LEFT JOIN (SELECT plan_ID, carrier_ID, name FROM Plans) AS plan
        ON plan.plan_ID = Visits.plan_ID
        LEFT JOIN (SELECT carrier_ID, provider FROM Carriers) AS carrier
        ON plan.carrier_ID = carrier.carrier_ID
        WHERE patient.mrn = ?
        ORDER BY scheduled_time ASC;`

    // perform query, passing in query and ID
    db.pool.query(query, mrn, (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

/**POST route
 * Body structure ($ is mandatory)
 * {
 *  $first_name: String,
 *  $last_name: String,
 *  $date_of_birth: String,
 *      - the native output of date/date-time type Input selectors works
 *  $sex: String - M | F | freetext,
 *  $phone_number: String,
 *  email, address_1, address_2, city, state, postal_code : Strings,
 *  insurance_policy: String - the policy # on insurance card,
 *  insurance_group: String - group # on insurance card,
 *  plan: {plan_ID: foreign key for insurance plan}
 *      - insurance info is optional as patient can be self-pay
 * }
 */
router.post('/', (req, res) => {
    const data = req.body;

    // Converts empty strings to null
    Object.keys(data).map((key) => {
        if (data[key] === '') data[key] = null;
    });

    // Prepare inserts for query
    const inserts = [
        data.first_name,
        data.last_name,
        data.date_of_birth,
        data.sex,
        data.phone_number,
        data.email,
        data.address_1,
        data.address_2,
        data.city,
        data.state,
        data.postal_code,
        data.insurance_policy,
        data.insurance_group,
        data.plan && data.plan.plan_ID  // if data.plan is NULL, store NULL
    ];

    // perform query, passing in inserts
    db.pool.query(
        `INSERT INTO Patients (
            first_name, 
            last_name, 
            date_of_birth, 
            sex, 
            phone_number, 
            email,
            address_1,
            address_2,
            city,
            state,
            postal_code,
            insurance_policy,
            insurance_group,
            plan_ID
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        inserts,
        (err, rows, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(rows);
            }
        });
});

/**PUT route
 * :mrn URL parameter
 * 
 * Body structure ($ is mandatory)
 * {
 *  $first_name: String,
 *  $last_name: String,
 *  $date_of_birth: String,
 *      - the native output of date/date-time type Input selectors works
 *  $sex: String - M | F | freetext,
 *  $phone_number: String,
 *  email, address_1, address_2, city, state, postal_code : Strings,
 *  insurance_policy: String - the policy # on insurance card,
 *  insurance_group: String - group # on insurance card,
 *  plan: {plan_ID: foreign key for insurance plan}
 *      - insurance info is optional as patient can be self-pay
 * }
 */
router.put('/:mrn', (req, res) => {
    const data = req.body;
    const mrn = req.params.mrn;

    // Converts empty strings to null
    Object.keys(data).map((key) => {
        if (data[key] === '') data[key] = null;
    });

    // Prepare inserts for query
    const inserts = [
        data.first_name,
        data.last_name,
        data.date_of_birth,
        data.sex,
        data.phone_number,
        data.email,
        data.address_1,
        data.address_2,
        data.city,
        data.state,
        data.postal_code,
        data.insurance_policy,
        data.insurance_group,
        data.plan && data.plan.plan_ID,  // if data.plan is NULL, store NULL
        mrn
    ];

    // perform query, passing in inserts
    db.pool.query(
        `UPDATE Patients 
        SET
            first_name = ?, 
            last_name = ?, 
            date_of_birth = ?, 
            sex = ?, 
            phone_number = ?, 
            email = ?,
            address_1 = ?,
            address_2 = ?,
            city = ?,
            state = ?,
            postal_code = ?,
            insurance_policy = ?,
            insurance_group = ?,
            plan_ID = ?
        WHERE mrn = ?`,
        inserts,
        (err, rows, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(rows);
            }
        });
});

/**DELETE route
 * :mrn URL parameter
 * 
 * successful response contains affectedRows property
 */
router.delete('/:mrn', (req, res) => {
    const mrn = req.params.mrn;
    db.pool.query('DELETE FROM Patients WHERE mrn = ?', mrn, (err, results, fields) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;