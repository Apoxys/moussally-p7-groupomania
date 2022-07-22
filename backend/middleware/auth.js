const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.WEB_AUTH_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    // console.log(token, decodedToken, userId, req.auth)
    if (req.body.userId && req.body.userId !== userId) {
      throw "unvalid user ID!";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error + "Unidentified request!" });
  }
};
