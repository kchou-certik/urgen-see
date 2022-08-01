require('dotenv').config();
const db = require('./db');
const cors = require('cors');


// Express initialization
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const carriers = require('./routes/carriers');
const patients = require('./routes/patients');
const staff = require('./routes/staff');
const visits = require('./routes/visits');

app.use('/carriers', carriers);
app.use('/patients', patients);
app.use('/staff', staff);
app.use('/visits', visits);



app.listen(port, () => {
    console.log(`API server started on port ${port}`);
});