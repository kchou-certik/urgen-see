const db = require('../db');
const express = require('express');
const router = express.Router();

/**GET ALL route 
 * 
 * returns array of row objects, where each row has key=column name, value=data value
*/
router.get('/', (req, res) => {
    // perform query
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

/**GET ONE route
 * :id - staff_ID URL parameter
 * 
 * returns a single object where key=column name, value=data
 */
router.get('/:id', (req, res) => {
    // perform query, passing in ID
    db.pool.query('SELECT * FROM Staff WHERE staff_ID=?;', req.params.id, (err, rows, fields) => {
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
 *  $first_name: String,
 *  $last_name: String,
 *  $practitioner_type: String - e.g. MD, RN,
 *  $phone_number: String,
 *  email, address_1, address_2, city, state, postal_code : Strings,
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

    // perform query, passing in inserts
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

module.exports = router;