const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Accept array of column names, default to *
    const cols = !(req.query.cols) ? "*" : db.pool.escapeId(req.query.cols);

    // Select visits from a specific day in YYYY-MM-DD format
    let date = "";
    if (req.query.date) {
        const dateParam = db.pool.escape(req.query.date);
        date = `WHERE date(scheduled_time) = ${dateParam}`;
    }

    const query = `SELECT ${cols} FROM Visits ${date} ORDER BY scheduled_time ASC;`

    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    db.pool.query('SELECT * FROM Visits WHERE visit_ID=?;', req.params.id, (err, rows, fields) => {
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
                res.json(rows);
            }
        });
});

// TODO
router.put('/:carrier_ID', (req, res) => {
    const { provider, phone_number } = req.body;
    const carrier_ID = req.params.carrier_ID;
    if (!phone_number || !provider) {
        res.sendStatus(400);
        return;
    }
    let updateCarrierQuery = `UPDATE Carriers SET phone_number = ?, provider = ? WHERE carrier_ID = ?`;
    db.pool.query(updateCarrierQuery, [phone_number, provider, carrier_ID],
        (err, rows, fields) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(rows);
            }
        });
});

// TODO
router.delete('/:id', (req, res) => {
    const carrier_id = req.params.id;
    db.pool.query('DELETE FROM Carriers WHERE carrier_id = ?', carrier_id, (err, results, fields) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;