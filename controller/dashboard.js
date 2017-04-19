const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');


module.exports.dashboard = (req, res) => {
    let user = auth.currentUser;
    if(user === null){
        res.redirect("/");
    }
    res.render("dashboard");
}
