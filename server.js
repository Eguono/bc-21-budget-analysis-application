const express = require("express"),
    bodyParser = require("body-parser");

//Initialize Express App
const app = express();
const route = express.Router();


//listening on port 5000
const port = 5000 || process.env.PORT;

//setup static directory
express.static("public");

//Setup ejs as view engine
app.set('views', process.cwd() + '/views');
app.set('view engine', 'ejs');

//using bodyParser as middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
route("/")
    .get((req, res) => {
        res.send("Working!");
    });

app.listen(port, () => {
    console.log("Listening on port: " + port);
});