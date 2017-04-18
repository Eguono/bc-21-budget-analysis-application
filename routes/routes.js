

module.exports = (app, route) => {
    app.route("/")
        .get((req, res) => {
            res.send("It lives!!!!!");
        });

    app.route("/register")
        .get((req, res)=>{
            res.render("register");
        });

    app.route("/login")
        .get((req, res)=>{
            res.send("login page");
        });

    app.route("/dashboard")
        .get((req, res)=>{
            res.send("dashboard page");
        });

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

    app.route("*")
        .get((req, res)=>{
            res.send("Page not found");
        });
}