
const firebase = require('../helper/firebase.js');
const auth = firebase.auth();
const db = firebase.database();
const ref = db.ref('/');


module.exports.register = (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let password1 = req.body.password1;

    req.checkBody('firstName', 'First Name is Required').notEmpty();
    req.checkBody('firstName', 'Invalid Full Name').isAlpha();
    req.checkBody('lastName', 'Last Name is Required').notEmpty();
    req.checkBody('lastName', 'Must be alphabets').isAlpha();
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is Required').notEmpty();
    req.checkBody('password1', 'Passwords do not match').equals(password);



    let errors = req.validationErrors();

    if (errors) {
        console.log(errors)
        let errormsg = errors[0].msg;
        return res.render('register', { error: errormsg });
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user.updateProfile({
                    displayName: firstName,
                    photoURL: "/img/blank-profile-picture.png"
                }).catch((err) => {
                    let errorCode = err.code;
                    let errorMessage = err.message;
                    console.log(errorMessage);
                });
                user.sendEmailVerification();
                let userId = user.uid;
                let userRefs = ref.child("users/" + userId)
                userRefs.set({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userId: userId
                });
                res.redirect('/dashboard');
            })
            .catch((err) => {
                let errorCode = err.code;
                let errorMessage = err.message;
                return res.render('register', { error: errorMessage })
            });

    }

}

module.exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        let errormsg = errors[0].msg;
        res.render('login', {
            error: errormsg
        });
    } else {
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                res.redirect('/dashboard');
            }).catch(err => {
                let errorCode = err.code;
                let errorMessage = err.message;
                return res.render('login', { error: errorMessage })
            })
    }
}


module.exports.signOut = (req, res) => {
    auth.signOut().then(() => {
        res.redirect('/');
    }, (error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
    });
}

