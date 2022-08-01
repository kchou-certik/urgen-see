const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    db.pool.query(
        `SELECT mrn, last_name, first_name, date_of_birth,
        sex, phone_number, email, address_1, address_2, city, state,
        postal_code, insurance_policy, insurance_group, Plans.name AS plan_name 
        FROM Patients
        JOIN Plans
        ON Patients.plan_ID = Plans.plan_ID
        ORDER BY last_name ASC`,
        (err, rows, fields) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.json(rows);
        });
});

router.get('/:id', (req, res) => {
    db.pool.query('SELECT * FROM Patients WHERE mrn=?;', req.params.id, (err, rows, fields) => {
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