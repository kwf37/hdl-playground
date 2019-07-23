const express = require('express');
const passport = require('passport');
const Account = require('../account');
const router = express.Router();

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {

        if (err) {
            console.log(err);
            res.send(err);
            return;
        }

        passport.authenticate('local')(req, res, function () {
            console.log("Registered!");
            res.redirect('/');
        });
    });
});

module.exports = router;