const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db.js');
const app = express();
const port = 8000;

app.use(express.static('src'));     // src - директория

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, (err, database) => {
    if (err){
        return console.log(err);
    }
    require('./routes')(app, database);
    app.listen(port, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`------------------------------
------------------------------
Server is on port: ${port}
------------------------------
------------------------------
URL: http://localhost:${port}
------------------------------
------------------------------`);
    });
});