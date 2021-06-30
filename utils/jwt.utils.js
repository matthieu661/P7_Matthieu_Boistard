const jwt = require('jsonwebtoken');

// openclassroomP7 en sha256
const JWT_SIGN_SECRET = '5d247c460793437146f7fd297d358e0ff78d06ef1bb5e52952dd19303560ae6b';

module.exports = {
  generateToken: function (userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
      JWT_SIGN_SECRET,
      {
        expiresIn: '25h'
      })
  },
  parseAuthorization: function (authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function (authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null)
          userId = jwtToken.userId;
      } catch (err) { };
    }
    return userId;
  },
  getUserRole: function (authorization) {
    var adminRole = -1;
    var token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null)
          adminRole = jwtToken.isAdmin;
      } catch (err) { }
    }
    return adminRole;
  },
  // control methode openclassroom
  authRoutes : function(req, res, next) {
    try {
      var token = req.headers.authorization.split(' ')[1]; 
      var jwtToken = jwt.verify(token, JWT_SIGN_SECRET); 
      var userId2 = jwtToken.userId;  
      if (req.body.userId && req.body.userId !== userId2) { 
          throw ' Problem auth :  invalid token';
      } else {
          next();
      }
  } catch (error) {
      res.status(401).json({ error: new Error('Invalid request !') });
  }
  }

}