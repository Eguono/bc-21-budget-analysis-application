const auth = require("../controller/auth.js");
const dashboard = require("../controller/dashboard.js");
const budget = require("../controller/budget.js");
const income = require("../controller/income.js");
const expense = require("../controller/expense.js");
const api = require("../controller/api.js");

module.exports = (app, route) => {
    app.route("/")
        .get((req, res) => {
            res.render("login", { error: null });
        }).post(auth.login);

    app.route("/register")
        .get((req, res) => {
            res.render("register", { error: null });
        }).post(auth.register);

    app.route("/dashboard")
        .get(dashboard.dashboard);

    app.route("/dashboard/incomeApi")
        .get(api.incomeApi);

    app.route("/dashboard/expenseApi")
        .get(api.expenseApi);

    app.route("/budget")
        .get((req, res) => {
            res.render("budget", { error: null });
        }).post(budget.postBudget);

    app.route("/expense")
        .get((req, res) => {
            res.send("expense");
        }).post(expense.addExpense);

    app.route("/income")
        .get((req, res) => {
            res.send("income");
        }).post(income.addIncome);

    app.route("/signOut")
        .get(auth.signOut);

    app.route("*")
        .get((req, res) => {
            res.send("Page not found");
        });
}