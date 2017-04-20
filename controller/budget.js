const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.postBudget = (req, res) => {
    let amount = req.body.budgetamount;

    let user = auth.currentUser;
    if (user) {
        let userId = user.uid;
        ref.child("budget/" + userId).once("value", (snap) => {
            let result = {};
            if (snap.val() === null) {
                result["budget/" + userId] = {
                    amount: amount
                };
                ref.update(result);
                return res.redirect('/dashboard');
            }
            result["budget/" + userId] = {
                amount: amount
            };
            ref.update(result);
            res.redirect('/dashboard');
        }, (err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(err);
            res.redirect('/dashboard');
        });
    }


}