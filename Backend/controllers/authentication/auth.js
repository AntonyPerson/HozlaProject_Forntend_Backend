const User = require("../../models/authentication/user.model");
//const jwt = require('jsonwebtoken'); // to generate signed token
//const expressJwt = require('express-jwt'); // for auth check
//const {errorHandler} = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        // err: errorHandler(err)
      });
    }
    // user.salt = undefined;
    // user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  //find based on personalnumber
  const { personalnumber, password } = req.body;
  User.findOne(req.body.personalnumber, (err, user) => {
    if (!user) {
      return res.json({
        user: "DoNotExist", //"משתמש עם מספר אישי זה אינו קיים",
      });
    }
    if (err) {
      return res.status(400).json({
        error: err, //"משתמש עם מספר אישי זה אינו קיים",
      });
    }
    //if user found make sure the personalnumber and password match
    //create authenticate method in user model
    // if(!user.authenticate(password)){
    //     return res.status(401).json({
    //         error: 'הסיסמא שגויה'
    //     })
    // }
    /*   //generate a signed token with user id and secret
        const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET);
        //presist the token as 't' in cookie with expiry date
        res.cookie('t' ,token, {expire: new Date() + 9999});
        // return response with user and token to frontend client */
    // const {_id, name, lastname, personalnumber, role,number,gdodid,hativaid,ogdaid,pikodid,validated,workplan, zminot, kshirot, adam} = user
    return res.json({ user: user });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "התנתקת בהצלחה" });
};

/*exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
});*/
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: " אין גישה",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "לא ניתנה הרשאה של מנהל",
    });
  }
  next();
};
