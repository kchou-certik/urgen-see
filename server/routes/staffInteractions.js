const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { visit_ID } = req.query;
    let idString = "";
    if (visit_ID) {
        const idParam = db.pool.escape(visit_ID);
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

    db.pool.query(
        query, (err, rows, fields) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(rows);
        });
});

router.get('/:id', (req, res) => {
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


router.post('/', (req, res) => {
    const staff_ID = req.body.data.staffMember.staff_ID;
    const visit_ID = req.body.insertId;

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

router.put('/:visit_staff_ID', (req, res) => {
    const staff_ID = req.body.staffMember.staff_ID;
    const visit_staff_ID = req.params.visit_staff_ID;

    db.pool.query(`UPDATE Staff_Interactions SET staff_ID = ? WHERE visit_staff_ID = ?`, [staff_ID, visit_staff_ID],
        (err, rows, fields) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
});

router.delete('/', (req, res) => {
    const { visit_ID } = req.query;

    if (!visit_ID) {
        // We require a visit_ID
        res.sendStatus(400);
        return;
    }

    const query = `DELETE FROM Staff_Interactions 
    WHERE visit_ID = ?`;

    db.pool.query(query, visit_ID, (err, results, fields) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

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