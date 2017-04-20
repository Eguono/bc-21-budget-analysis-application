const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.addExpense = (req, res) => {
    let amount = req.body.expenseamount;
    let description = req.body.expensedescription;
    let expenseType = req.body.expensetype;

    let user = auth.currentUser;
    if (user) {
        let userId = user.uid;
        ref.child("totalExpense/" + userId).once("value", (snap) => {
            let result = {};
            let expensesRef = ref.child('totalExpense/' + userId);
            let expenseRef = expensesRef.push();
            let expenseKey = expenseRef.key;
            let data = {
                amount: amount,
                description: description,
                expenseType: expenseType,
                id: expenseKey
            };
            if (snap.val() === null) {
                result["totalExpense/" + userId] = amount;
                result["expense/" + userId + "/" + expenseKey] = data;

                ref.update(result);
                return res.redirect('/dashboard');
            }
            let totalExpense = Number(snap.val()) + Number(amount);
            result["totalExpense/" + userId] = totalExpense;
            result["expense/" + userId + "/" + expenseKey] = data;

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