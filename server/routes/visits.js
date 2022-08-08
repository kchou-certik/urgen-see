const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Accept array of column names, default to *
    const cols = !(req.query.cols) ?
        `visit_ID, CONCAT(last_name, ", ", first_name) AS patient_name, patient.mrn, scheduled_time, check_in_time, discharge_time,
        primary_diagnosis, visit_type, carrier.carrier_ID, plan.plan_ID, CONCAT(provider, " ", plan.name) AS visit_insurance`
        : db.pool.escapeId(req.query.cols);

    // Select visits from a specific day in YYYY-MM-DD format
    let date = "";
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

    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

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
    db.pool.query(query, req.params.id, (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows[0]);  // SELECT returns an array; we only need the first result
    });
});


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