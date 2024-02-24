const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectMongoDb = require('./init/mongodb');
const todoRoute = require('./routes/todo');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//connect to mongo db database
connectMongoDb();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', todoRoute);

module.exports = app;