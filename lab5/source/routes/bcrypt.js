
var bcrypt = require('bcryptjs');

function encryption() {
    return {
        getCrypt: function (value) {
            return bcrypt.hashSync(value, bcrypt.genSaltSync(10));
        },
        compareHashSync: function (value1, value2) {
            value1 = value1 || "";
            value2 = value2 || "";
            return bcrypt.compareSync(value1, value2);
        }

    }
}

module.exports.crypt = encryption;

