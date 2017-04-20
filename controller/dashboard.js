const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

let dataTable;
module.exports.dashboard = (req, res) => {
        let user = auth.currentUser;
        if(user){
            
        }
        res.render("dashboard", { error: null });
    

}

