const jwt = require("jsonwebtoken");

// Take the token sent in request and extract the userId from it
module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.WEB_AUTH_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "unvalid user ID!";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error + "Unidentified request!" });
  }
};
