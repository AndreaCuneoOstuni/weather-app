// /* Commands to run in the terminal */
// // npm install express
// // npm install body-parser
// // npm install cors

// // Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('app'));
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);
// Callback
function listening() {
    console.log(`server running on port: ${port}`);
}

// Get Route with callback function
app.get('/all', function (req, res) {
    res.send(projectData);
    console.log(projectData);
})

// Post Route with callback function
app.post('/add', function (req, res) {
    let weatherEntry = {
        name: req.body.name,
        date: req.body.date,
        temperature: req.body.temperature,
        feelings: req.body.feelings
    };
    Object.assign(projectData, weatherEntry);
    res.send(weatherEntry);
});