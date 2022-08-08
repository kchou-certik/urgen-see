const db = require('../db');
const express = require('express');
const router = express.Router();

/**GET ALL/SOME route 
 * 
 * URL QUERY parameters (OPTIONAL - parameters to narrow query):
 * - if none specified, defaults to ALL
 * 
 *  visit_ID: foreign key for visit_ID - limit search to staff that interacted with just that visit
 * 
 * returns array of row objects, where each row has key=column name, value=data value
*/
router.get('/', (req, res) => {
    const { visit_ID } = req.query;

    let idString = "";  // the string to insert into our query; defaults to ""
    if (visit_ID) {
        const idParam = db.pool.escape(visit_ID);   // escape the input
        idString = `WHERE Staff_Interactions.visit_ID = ${idParam}`;
    }

    const query =
        `SELECT visit_staff_ID, CONCAT(Patients.last_name, ", ", Patients.first_name) AS patient_name, Patients.date_of_birth, Patients.mrn,
        Visits.scheduled_time, 
        CONCAT(Staff.last_name, ", ", Staff.first_name, ", ", Staff.practitioner_type) AS staff_name,
        Staff.staff_ID, Patients.mrn
        FROM Staff_Interactions
        JOIN Visits
        ON Staff_Interactions.visit_ID = Visits.visit_ID
        JOIN Staff
        ON Staff_Interactions.staff_ID = Staff.staff_ID
        JOIN Patients
        ON Visits.mrn = Patients.mrn
        ${idString}
        ORDER BY Visits.scheduled_time DESC;`

    // perform query, passing in query
    db.pool.query(
        query, (err, rows, fields) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(rows);
        });
});

/**GET ONE route
 * :id - visit_staff_ID URL parameter
 * 
 * returns a single object where key=column name, value=data
 */
router.get('/:id', (req, res) => {
    // perform query, passing in ID
    db.pool.query(`
    SELECT * FROM Staff_Interactions
    LEFT JOIN Staff
    ON Staff.staff_ID = Staff_interactions.staff_ID
    WHERE visit_staff_ID=?;`, req.params.id, (err, rows, fields) => {
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
 *  $staff_ID: foreign key - the staff member who interacted with this visit,
 *  $visit_ID: foreign key - the visit we are adding the staff interaction to
 * }
 */
router.post('/', (req, res) => {
    const staff_ID = req.body.data.staffMember.staff_ID;
    const visit_ID = req.body.insertId;

    // perform query
    db.pool.query(`INSERT INTO Staff_interactions (staff_ID, visit_ID)
        VALUES (?, ?)`,
        [staff_ID, visit_ID],
        (err, rows, fields) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(rows);
            }
        }
    );
});

/**PUT route
 * :visit_staff_ID - URL parameter for the record we wish to update
 * 
 * Body structure ($ is mandatory)
 * {
 *  $staff_ID: foreign key - the staff member who interacted with this visit,
 *  $visit_ID: foreign key - the visit we are adding the staff interaction to
 * }
 */
router.put('/:visit_staff_ID', (req, res) => {
    const staff_ID = req.body.staffMember.staff_ID;
    const visit_staff_ID = req.params.visit_staff_ID;

    // perform query
    db.pool.query(`UPDATE Staff_Interactions SET staff_ID = ? WHERE visit_staff_ID = ?`, [staff_ID, visit_staff_ID],
        (err, rows, fields) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
});

/**DELETE SOME route
 * deletes ALL staff interactions for ONE visit_ID
 * 
 * :visit_ID URL parameter - the visit_ID which we wish to delete staff interactions for
 * 
 * successful response contains affectedRows property
 */
router.delete('/', (req, res) => {
    const { visit_ID } = req.query;

    if (!visit_ID) {
        // We require a visit_ID!
        // Without specifying a visit_ID, mySQL would delete EVERYTHING!
        res.sendStatus(400);
        return;
    }

    const query = `DELETE FROM Staff_Interactions 
    WHERE visit_ID = ?`;

    // perform query, passing in id
    db.pool.query(query, visit_ID, (err, results, fields) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

/**DELETE ONE route
 * :visit_staff_ID URL parameter
 * 
 * successful response contains affectedRows property
 */
router.delete('/:id', (req, res) => {
    const visit_staff_ID = req.params.id;
    db.pool.query(`DELETE FROM Staff_Interactions WHERE visit_staff_ID = ?`, visit_staff_ID, (err, results, fields) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;