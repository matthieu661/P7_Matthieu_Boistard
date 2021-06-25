const jwt = require('jsonwebtoken');

// openclassroomP7 en sha256
const SECRET = '5d247c460793437146f7fd297d358e0ff78d06ef1bb5e52952dd19303560ae6b';

module.exports = {
    generateToken : function(userData){
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        SECRET,
        {
            expiresIn: '12h'
        }
        )

    }
}