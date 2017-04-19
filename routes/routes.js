const auth = require("../controller/auth.js");
const dashboard = require("../controller/dashboard.js");

module.exports = (app, route) => {
    app.route("/")
        .get((req, res)=>{
            res.render("login", {error: null});
        }).post(auth.login);

    app.route("/register")
        .get((req, res)=>{
            res.render("register", {error: null});
        }).post(auth.register);

    app.route("/dashboard")
        .get(dashboard.dashboard);

    app.route("/income")
        .get((req, res)=>{
            res.send("income page");
        });
    
    app.route("/expenses")
        .get((req, res)=>{
            res.send("expenses");
        });

    app.route("/budgetHistory")
        .get((req, res)=>{
            res.send("budget history page");
        });
    
    app.route("/signOut")
        .get(auth.signOut);

    app.route("*")
        .get((req, res)=>{
            res.send("Page not found");
        });
}