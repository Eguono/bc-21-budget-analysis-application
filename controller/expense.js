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
        ref.child("totalExpense/" + userId + "/totalexpense").once("value", (snap) => {
            let result = {};
            let expensesRef = ref.child('totalExpense/' + userId);
            let expenseRef = expensesRef.push();
            let expenseKey = expenseRef.key;
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let data = {
                amount: amount,
                description: description,
                expenseType: expenseType,
                date: date,
                id: expenseKey
            };
            if (snap.val() === null) {
                result["totalExpense/" + userId + "/totalexpense"] = amount;
                result["expense/" + userId + "/" + expenseKey] = data;

                ref.update(result);
                return res.redirect('/dashboard');
            } else {
                let totalExpense = Number(snap.val()) + Number(amount);
                result["totalExpense/" + userId + "/totalexpense"] = totalExpense;
                result["expense/" + userId + "/" + expenseKey] = data;

                ref.update(result);
                res.redirect('/dashboard');
            }

        }, (err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(err);
            res.redirect('/dashboard');
        });
    }

}

module.exports.displayExpense = (req, res) => {
    let user = auth.currentUser;
    if (user) {
        let userId = user.uid;
        ref.child("expense/" + userId).on("value", (snap) => {
            res.render("expense", { data: snap.val() })
        }, (err) => {
            var errorCode = err.code;
            var errorMessage = err.message;

            res.redirect('/dashboard');
        });

    } else {
        res.render("login", { error: "Please Login To Use the Web App" });
    }

}