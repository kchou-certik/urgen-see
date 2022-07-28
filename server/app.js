require('dotenv').config();
const db = require('./db');
const cors = require('cors');

// Express:
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/carriers', (req, res) => {
    db.pool.query('SELECT * FROM Carriers;', (err, rows, fields) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(rows);
    });
});

app.post('/carriers', (req, res) => {
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

app.delete('/carriers/:id', (req, res) => {
    const carrier_id = req.params.id;
    db.pool.query('DELETE FROM Carriers WHERE carrier_id = ?', carrier_id, (err, results, fields) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`API server started on port ${port}`);
});