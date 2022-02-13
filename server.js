// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors =require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port =8000;
const server =app.listen(port,listening);

function listening(){
    console.log('Server is running');
    console.log(`Running on local host ${port}`);

};
//Route to get all data
app.get('/all', (request, response)=> {
    response.send(projectData);
  });

//Route to add data
app.post('/addData', addData);

function addData (request, response){
    projectData['temperature'] = request.body.temperature,
    projectData['date'] = request.body.date,
    projectData['feel'] = request.body.feel
    
    response.send(projectData)
};