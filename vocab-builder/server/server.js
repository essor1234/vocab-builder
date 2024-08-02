const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocab = require('./api/models/vocabModel');
const routes = require('./api/routes/vocabRoutes');



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vocab-builder1',
    {useNewUrlParser: true}
);

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// For testing csv


// Import the add_csv function
// const { add_csv } = require('../server/api/controllers/vocabController');

// Define a new route for the CSV import
// app.post('/import-csv', add_csv);


routes(app);
app.listen(port);
app.use((req, res) => {
    res.status(404).send({url: `${req.originalUrl} not found`});
});




console.log(`Server started on port ${port}`)