const db = require('../db');
const express = require('express');
const router = express.Router();

/**GET ALL/SOME route 
 * 
 * URL QUERY parameters (ALL OPTIONAL - parameters to narrow query):
 * - if none specified, defaults to ALL
 * 
 * cols: Array[String] - the column names you want to fetch
 * date: String - YYYY-MM-DD format; only get visits for this date
 * 
 * returns array of row objects, where each row has key=column name, value=data value
*/
router.get('/', (req, res) => {
    // Accept array of column names, default to mostly all
    const cols = !(req.query.cols) ?
        `visit_ID, CONCAT(last_name, ", ", first_name) AS patient_name, patient.mrn, scheduled_time, check_in_time, discharge_time,
        primary_diagnosis, visit_type, carrier.carrier_ID, plan.plan_ID, CONCAT(provider, " ", plan.name) AS visit_insurance`
        : db.pool.escapeId(req.query.cols);

    // Select visits from a specific day in YYYY-MM-DD format
    let date = "";  // string to insert into query; defaults to ""
    if (req.query.date) {
        const dateParam = db.pool.escape(req.query.date);
        date = `WHERE date(scheduled_time) = ${dateParam}`;
    }

    const query =
        `SELECT ${cols} 
        FROM Visits 
        JOIN (SELECT last_name, first_name, mrn FROM Patients) AS patient
        ON patient.mrn = Visits.mrn
        LEFT JOIN (SELECT plan_ID, carrier_ID, name FROM Plans) AS plan
        ON plan.plan_ID = Visits.plan_ID
        LEFT JOIN (SELECT carrier_ID, provider FROM Carriers) AS carrier
        ON plan.carrier_ID = carrier.carrier_ID
        ${date} 
        ORDER BY scheduled_time ASC;`

    // perform query
    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

/**GET ONE route
 * :id - visit_ID URL parameter
 * 
 * returns a single object where key=column name, value=data
 */
router.get('/:id', (req, res) => {
    const query =
        `SELECT *, CONCAT(Carriers.provider, " ", Plans.name) AS plan_name FROM Visits
        JOIN Patients
        ON Visits.mrn = Patients.mrn
        LEFT JOIN Plans
        ON Visits.plan_ID = Plans.plan_ID
        LEFT JOIN Carriers
        ON Plans.carrier_ID = Carriers.carrier_ID
        WHERE Visits.visit_ID=?;`;

    // perform query, passing in ID
    db.pool.query(query, req.params.id, (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows[0]);  // SELECT returns an array; we only need the first result
    });
});

/**POST route
 * Body structure ($ is mandatory)
 * {
 *  $mrn: foreign key - the patient this visit is for,
 *  $scheduled_time: datetime String - scheduled date and time; default HTML date-time calendar value should work
 *  $visit_type: String - details about the visit
 *  primary_diagnosis: String
 *  plan: {plan_ID: foreign key for insurance plan} - the plan used for the visit (if any)
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
        data.mrn,
        data.plan_ID,
        data.primary_diagnosis,
        data.scheduled_time,
        data.visit_type
    ];

    // perform query, passing in inserts
    db.pool.query(`INSERT INTO Visits (mrn, plan_ID, primary_diagnosis, scheduled_time, visit_type)
        VALUES (?, ?, ?, ?, ?)`,
        inserts,
        (err, rows, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                return res.json(rows);
            }
        });
});

/**PUT route
 * :visit_ID URL parameter
 * 
 * Body structure ($ is mandatory)
 * {
 *  $scheduled_time: datetime String - scheduled date and time; default HTML date-time calendar value should work
 *  check_in_time: datetime String - default HTML date-time calendar value should work
 *  discharge_time: datetime String - default HTML date-time calendar value should work
 *  $visit_type: String - details about the visit
 *  primary_diagnosis: String
 *  plan: {plan_ID: foreign key for insurance plan} - the plan used for the visit (if any)
 * }
 */
router.put('/:visit_ID', (req, res) => {
    const data = req.body;
    const visit_ID = req.params.visit_ID;

    // Converts empty strings to null
    Object.keys(data).map((key) => {
        if (data[key] === '') data[key] = null;
    });

    // Prepare inserts for query
    const inserts = [
        data.scheduled_time,
        data.check_in_time,
        data.discharge_time,
        data.primary_diagnosis,
        data.visit_type,
        data.plan && data.plan.plan_ID,  // if data.plan is NULL, store NULL
        visit_ID
    ];

    // perform query, passing in inserts
    db.pool.query(
        `UPDATE Visits 
        SET
        scheduled_time = ?, 
        check_in_time = ?, 
        discharge_time = ?, 
        primary_diagnosis = ?, 
        visit_type = ?, 
        plan_ID = ?
        WHERE visit_ID = ?`,
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
 * :id - visit_ID URL parameter
 * 
 * successful response contains affectedRows property
 */
router.delete('/:id', (req, res) => {
    const visit_ID = req.params.id;
    db.pool.query('DELETE FROM Visits WHERE visit_ID = ?', visit_ID, (err, results, fields) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;