const express = require("express"),
    bodyParser = require("body-parser");

const app = express();

const port = 5000 || process.env.PORT;

app.get("/", (req, res) => {
    res.send("Working!");
});

app.listen(port, ()=>{
    console.log("Listening on port: " + port);
});