const jwt = require('jsonwebtoken');

// openclassroomP7 en sha256
const SECRET = '5d247c460793437146f7fd297d358e0ff78d06ef1bb5e52952dd19303560ae6b';

module.exports = {
    generateTokenForUser: function(userData) {
      return jwt.sign({
        userId: userData.id,
        isAdmin: userData.isAdmin
      },
      SECRET,
      {
        expiresIn: '1h'
      })
    },
    GrabAuth: function(authorization) {
      return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    grabId: function(authorization) {
      const userId = -1;
      const token = module.exports.GrabAuth(authorization);
      if(token != null) {
        try {
          const jwtToken = jwt.verify(token, SECRET);
          if(jwtToken != null)
            userId = jwtToken.userId;
        } catch(err){}
      }
      return userId;
    }
  }