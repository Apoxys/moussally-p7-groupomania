const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.WEB_AUTH_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "unvalid user ID!";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: error | "Unidentified request!" });
  }
};
