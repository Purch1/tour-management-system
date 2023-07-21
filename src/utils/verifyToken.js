const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookie.accessToken;

  if (!token) {
    return res
      .status(STATUS_CODE.NOT_FOUND)
      .json({ error: "You're not authorized" });
  }

  //if token exist the verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "Token is invalid" });
    }

    req.user = user
    next()
  });

};

exports.verifyUser = (req, res, next)=>{
    verifyToken(req, res, next, ()=> {
        if ( req.user.role === 'admin') {
            next()
        }else {
            return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "You're not authorized" });
        }
    })
}

exports.verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, ()=> {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next()
        }else {
            return res
        .status(STATUS_CODE.NOT_FOUND)
        .json({ error: "You're not authenticated" });
        }
    })
}
