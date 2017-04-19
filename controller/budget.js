const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');

module.exports.postBudget = (req, res) => {
    let user = auth.currentUser;

    if(user === null){
        res.redirect("/");
    }
    let section = req.body.eguono.toLowerCase();
    let month = req.body.month;
    let income = req.body.income;
    let rent = req.body.rent;
    let utilities = req.body.utilities;
    let insurance = req.body.insurance;
    let groceries = req.body.groceries;
    let health = req.body.health;
    let entertainment = req.body.entertainment;
    let restaurant = req.body.restaurant;
    let personalcare = req.body.personalcare;
    let servicecharges = req.body.servicecharges;
    let shopping = req.body.shopping;
    let gifts = req.body.gifts;
    let travel = req.body.travel;
    let other = req.body.other;

    req.checkBody("income", "income is invalid").notEmpty().isInt();
    req.checkBody("rent", "rent is invalid").notEmpty().isInt();
    req.checkBody("utilities", "utilities is invalid").notEmpty().isInt();
    req.checkBody("insurance", "insurance is invalid").notEmpty().isInt();
    req.checkBody("groceries", "groceries is invalid").notEmpty().isInt();
    req.checkBody("health", "health is invalid").notEmpty().isInt();
    req.checkBody("entertainment", "entertainment is invalid").notEmpty().isInt();
    req.checkBody("restaurant", "restaurant is invalid").notEmpty().isInt();
    req.checkBody("personalcare", "personal care is invalid").notEmpty().isInt();
    req.checkBody("servicecharges", "servicecharges is invalid").notEmpty().isInt();
    req.checkBody("gifts", "gifts is invalid").notEmpty().isInt();
    req.checkBody("travel", "travel is invalid").notEmpty().isInt();
    req.checkBody("other", "other is invalid").notEmpty().isInt();

    let errors = req.validationErrors();

    if (errors) {
        let errormsg = errors[0].msg;
        return res.render('budget', { error: errormsg });
    } else {

        budgetsRef = ref.child(section + "/" + month);
        budgetsRef.set({
            income: income,
            rent: rent,
            utilities: utilities,
            insurance: insurance,
            groceries: groceries,
            health: health,
            entertainment: entertainment,
            restaurant: restaurant,
            personalcare: personalcare,
            servicecharges: servicecharges,
            shopping: shopping,
            gifts: gifts,
            travel: travel,
            other: other
        });
        res.redirect("/dashboard");

    }

}