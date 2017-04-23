const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.addIncome = (req, res) => {
    let amount = req.body.amount;
    let description = req.body.description;
    let incomeType = req.body.incometype;

    req.checkBody('amount', 'Invalid Income Amount').notEmpty().isInt();

    let errors = req.validationErrors();

    if (errors) {
        console.log(errors)
        let errormsg = errors[0].msg;
        return res.redirect('dashboard');
    } else {


        let user = auth.currentUser;
        let userId = user.uid;

        ref.child("totalIncome/" + userId + "/totalincome").once("value", (snap) => {
            let result = {};
            let incomesRef = ref.child('totalIncome/' + userId);
            let incomeRef = incomesRef.push();
            let incomeKey = incomeRef.key;
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let data = {
                amount: amount,
                description: description,
                incomeType: incomeType,
                date: date,
                id: incomeKey
            };

            if (snap.val() === null) {
                result["totalIncome/" + userId + "/totalincome"] = amount;
                result["income/" + userId + "/" + incomeKey] = data;

                ref.update(result);
                return res.redirect('/dashboard');
            } else {
                let totalIncome = Number(snap.val()) + Number(amount);

                result["totalIncome/" + userId + "/totalincome"] = totalIncome;
                result["income/" + userId + "/" + incomeKey] = data;

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


    module.exports.displayIncome = (req, res) => {
        let user = auth.currentUser;
        if (user) {
            let userId = user.uid;
            ref.child("income/" + userId).once("value", (snap) => {
                res.render("income", { data: snap.val() })
            }, (err) => {
                var errorCode = err.code;
                var errorMessage = err.message;
                console.log(err);
                res.redirect('/dashboard');
            });

        } else {
            res.render("login", { error: "Please Login To Use the Web App" });
        }

    }

    module.exports.deleteIncome = (req, res) => {
        let user = auth.currentUser;
        let userId = user.uid;
        let id = req.query.id;
        let amount = req.query.amount;

        let incomeRefs = ref.child("income/" + userId + "/" + id)
        incomeRefs.set(null);
        ref.child("totalIncome/" + userId + "/totalincome").once("value", (snap) => {
            let newTotal = snap.val() - amount;
            ref.child("totalIncome/" + userId).update({ totalincome: newTotal });
            res.redirect('/income');
        }, (err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            console.log(err);
            res.redirect('/dashboard');
        });

    }