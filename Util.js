const jwt = require('jsonwebtoken');
const config= require("./config")

const getToken=(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    }.user,config.JWT_SECRET,{
        expiresIn:"48h"
    })
};

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('hii'+ token)
  
    if (token) {
      const onlyToken = token.slice(7, token.length);
      console.log('object' + onlyToken);
      jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({ message: 'Invalid Token' });
        }
        req.user = decode; // token
        next();
        return;
      });
    } else {
      return res.status(401).send({ message: 'Token is not supplied...' });
    }
  };

  const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  };

export { getToken, isAuth, isAdmin };