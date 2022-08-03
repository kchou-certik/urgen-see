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

// TODO
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