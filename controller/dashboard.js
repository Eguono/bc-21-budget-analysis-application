const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

let dataTable;
module.exports.dashboard = (req, res) => {
    let user = auth.currentUser;
    if (user) {
        let userId = user.uid;
        ref.child("totalExpense/" + userId + "/totalexpense").once("value")
            .then((snap) => {
                let expense = snap.val()
                let promise = [expense];
                ref.child("totalIncome/" + userId + "/totalincome").once("value")
                    .then((snap) => {
                        let income = snap.val();
                        promise.push(income);
                        return Promise.resolve(promise);
                    }).then((result) => {
                        return ref.child("users/" + userId).once("value").then((snap) => {
                            let balance = result[1]-result[0];
                            res.render("dashboard", { error: null, expense: result[0], income: result[1], user: snap.val(), balance:balance });
                        })
                    });
            }).catch((err) => {
                var errorCode = err.code;
                var errorMessage = err.message;

                res.redirect('/login');
            });
    } else {

        res.render("login", { error: "Please Login To Use the Web App" });
    }


}

