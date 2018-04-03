/**
 * Created by User on 05/04/2015.
 */
var express = require('express');
var mongo   = require('./mongo');
var bcrypt   = require('./bcrypt');
var rules    = require('./rules');

var router = express.Router();

/* GET register page. */
router.get('/', rules.rules().isLogged, function(req, res) {
    res.render('register', { title: "Chat Room - Registration" });
});

router.post('/', function(req, res) {
    var user = mongo.Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email.toLowerCase(),
        password: bcrypt.crypt().getCrypt(req.body.password)
    });

    user.save(function(err) {
        if (err) {
            var error = 'Opps, something happened! Try again in few minutes!';
            if (err.code === 11000) {
                error = 'That email is already taken, try another!';
            }
            res.render('register', { title: "Chat Room - Registration", error: error });
        } else {
            res.redirect('/auth');
        }
    });
});

module.exports = router;