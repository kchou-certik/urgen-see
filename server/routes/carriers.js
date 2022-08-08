const db = require('../db');
const express = require('express');
const router = express.Router();

/**GET ALL route 
 * 
 * returns array of row objects, where each row has key=column name, value=data value
*/
router.get('/', (req, res) => {
    db.pool.query(`
    SELECT provider, phone_number, carrier_ID 
    FROM Carriers
    ORDER BY provider ASC;`, (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

/**GET ONE route
 * :id - carrier_ID URL parameter
 */
router.get('/:id', (req, res) => {
    db.pool.query('SELECT * FROM Carriers WHERE carrier_ID=?;', req.params.id, (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows[0]);  // SELECT returns an array; we only need the first result since id is unique
    });
});

/**POST route
 * Body structure ($ is mandatory)
 * {
 *  $phone_number: String - phone number,
 *  $provider: String - the name of the insurance provider (e.g. Aetna)
 * }
 */
router.post('/', (req, res) => {
    const { phone_number, provider } = req.body;

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

/**PUT route
 * :carrier_ID URL parameter
 * 
 * Body structure ($ is mandatory)
 * {
 *  $phone_number: String - phone number,
 *  $provider: String - the name of the insurance provider (e.g. Aetna)
 * }
 */
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

/**DELETE route
 * :id - carrier_ID URL parameter
 * 
 * successful response contains affectedRows property
 */
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