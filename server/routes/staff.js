const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    db.pool.query(
        `SELECT staff_ID, CONCAT(last_name, ", ",first_name ) AS name,
        practitioner_type, phone_number, email,
        address_1, address_2, city, state, postal_code
        FROM Staff
        ORDER BY last_name ASC;`, (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    db.pool.query('SELECT * FROM Staff WHERE staff_ID=?;', req.params.id, (err, rows, fields) => {
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
        data.first_name,
        data.last_name,
        data.practitioner_type,
        data.phone_number,
        data.email,
        data.address_1,
        data.address_2,
        data.city,
        data.state,
        data.postal_code
    ];

    db.pool.query(
        `INSERT INTO Staff (
            first_name,
            last_name,
            practitioner_type,
            phone_number,
            email,
            address_1,
            address_2,
            city,
            state,
            postal_code
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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