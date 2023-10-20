const errorhandler = function (error, req, res, next) {
  console.log(error);
  if (error) {
    if (res.headersSent) {
      return res.status(error.code || 500).json({
        success: false,
        msg: error.message || "Internal server error",
      });
    }
    return res.status(error.code || 500).json({
      success: false,
      msg: error.message || "Internal server error",
    });
  }
  next();
};

module.exports = errorhandler;
