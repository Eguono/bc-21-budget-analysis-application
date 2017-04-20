const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.incomeApi = (req, res) => {
    let user = auth.currentUser;
    if (user) {

        let userId = user.uid;
        ref.child('income/' + userId).once('value').then((snap) => {
            res.send(snap.val());
        }, (err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
            console.log(err);
        });
    }
}

module.exports.expenseApi = (req, res) => {
    let user = auth.currentUser;
    if (user) {

        let userId = user.uid;
        ref.child('expense/' + userId).once('value').then((snap) => {
            res.send(snap.val());
        }, (err) => {
            let errorCode = err.code;
            let errorMessage = err.message;
            console.log(err);
        });
    }
}

