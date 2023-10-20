const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const verifytoken = (req, res, next) => {
  //checking token is valid or not
  try {
    const authtoken = req.header("Authorization");
    const token = authtoken.split(" ")[1];
    if (!token) {
      const err = new Error("Please authenticate using valid token");
      err.code = 401;
      next(err);
    }

    const data = jwt.verify(token, secret);
    req.user = data.id;
    next();
  } catch (error) {
    const err = new Error("Please authenticate using valid token");
    err.code = 401;
    next(err);
  }
};

module.exports = verifytoken;
