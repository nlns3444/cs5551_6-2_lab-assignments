
function rules() {
    return {
        requiredLogin: function(req, res, next)
        {
            if (!req.user) {
                res.redirect('/auth');
            } else {
                next();
            }
        },
        isLogged: function (req, res, next) {
            if (req.user) {
                res.redirect('/room');
            } else {
                next();
            }
        }
    }
}

module.exports.rules = rules;