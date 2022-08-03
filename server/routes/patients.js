const db = require('../db');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    db.pool.query(
        `SELECT mrn, last_name, first_name, date_of_birth,
        sex, phone_number, email, address_1, address_2, city, state,
        postal_code, insurance_policy, insurance_group, Plans.name AS plan_name 
        FROM Patients
        LEFT JOIN Plans
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
    db.pool.query(`
    SELECT * FROM Patients
    LEFT JOIN Plans
    ON Patients.plan_ID = Plans.plan_ID
    WHERE mrn=?;`, req.params.id, (err, rows, fields) => {
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

    // // Backend validation
    // if (!data.first_name || !data.last_name || !data.date_of_birth || !data.phone_number) {
    //     res.sendStatus(400);
    //     return;
    // }

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