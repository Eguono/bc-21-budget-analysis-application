const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

let dataTable;
module.exports.dashboard = (req, res) => {
    // let user = auth.currentUser;
    // if (user) {
    //     let userId = user.uid;
    //     let expense = ref.child("totalExpense/" + userId + "/totalexpense").once("value").then((snap) => {
    //         return snap.val();
    //     });
    //     let income = ref.child("totalIncome/" + userId + "/totalincome").once("value").then((snap) => {
    //         return snap.val();
    //     });
    //     let user = ref.child("users/" + userId).once("value").then((snap) => {
    //         return snap.val();
    //     });

    //     promise.all([income, expense, user]).then(([income, expense, user])=>{
    //         res.render("dashboard", { error: null ,income, expense, user});
    //     }).catch((err) => {
    //         var errorCode = err.code;
    //         var errorMessage = err.message;
    //         console.log(err);
    //         res.redirect('/login');
    //     });
    // }
    res.render("dashboard", { error: null });


}

