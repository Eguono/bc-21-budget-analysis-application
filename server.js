const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const expressValidator = require("express-validator");

const webRoutes = require("./routes/routes.js");

//Initialize Express App
const app = express();
const route = express.Router();


//listening on port 5000
const port = 5000 || process.env.PORT;

//setup static directory
app.use(express.static("./public"));

//Setup ejs as view engine
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');

//using bodyParser as middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Setup expressValidator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.');
        var root = namespace.shift();
        var formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//routes
webRoutes(app, route);

app.listen(port, () => {
    console.log("Listening on port: " + port);
});