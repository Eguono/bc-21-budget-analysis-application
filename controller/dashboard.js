const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

let dataTable;
module.exports.dashboard = (req, res) => {
    // let user = auth.currentUser;
    // if (user) {
    //     // User is signed in.
    //     let userId = user.uid;
    //     ref.child('income/' + userId).once('value', (snap) => {
    //         dataTable = [["Income", "Amount"]];
    //         for (let datas in snap.val()) {
    //             // data[datas].incomeType = ++data[datas].incomeType;
    //             dataTable.push([snap.val()[datas].incomeType, snap.val()[datas].amount]);
    //             // else { data.push([data[datas].incomeType, data[datas].amount]); }
    //         }
    //         console.log(snap.val());
    //         console.log(dataTable);
    //         return res.render("dashboard", { error: null, data: dataTable });
    //     }, (err) => {
    //         let errorCode = err.code;
    //         let errorMessage = err.message;
    //         console.log(err);
    //     });
    // } else {
        res.render("dashboard", { error: null });
    // }

}

// module.exports.data = () => {
//     return dataTable;
// }
