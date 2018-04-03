
// dependencies
var express         = require('express'),
    rules           = require('./rules');

var router          = express.Router();

/* GET rooms page. */
router.get('/', rules.rules().requiredLogin, function(req, res) {
    res.render('room', { title: "Chat Room - Room" });
});
module.exports = router;
