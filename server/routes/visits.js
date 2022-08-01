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

    const query = `SELECT ${cols} FROM Visits ${date};`

    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
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

// TODO
router.post('/', (req, res) => {
    const { phone_number, provider } = req.body;
    if (!phone_number || !provider) {
        res.sendStatus(400);
        return;
    }
    db.pool.query(`INSERT INTO Carriers (phone_number, provider)
        VALUES (?, ?)`,
        [phone_number, provider],
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
                console.log(err);
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