const db = require('../db');
const express = require('express');
const router = express.Router();

/**GET ALL route 
 * 
 * returns array of row objects, where each row has key=column name, value=data value
*/
router.get('/', (req, res) => {
    db.pool.query(
        `SELECT plan_ID, Plans.carrier_ID, provider, name, referral_required
        FROM Plans
        INNER JOIN Carriers
        ON Plans.carrier_ID = Carriers.carrier_ID
        ORDER BY 
        provider ASC,
        name ASC;`, (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

/**POST route
 * Body structure ($ is mandatory)
 * {
 *  $carrier: {carrier_ID: foreign key for insurance carrier},
 *  $plan_name: String,
 *  referral_required: 1 (yes) | 0 (no) | "" (unknown),
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
        data.carrier && data.carrier.carrier_ID, // if data.carrier is NULL, store NULL
        data.name,
        data.referral_required
    ];

    // perform query, passing in inserts
    db.pool.query(
        `INSERT INTO Plans (
            carrier_ID,
            name,
            referral_required
        )
        VALUES (?, ?, ?)`,
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