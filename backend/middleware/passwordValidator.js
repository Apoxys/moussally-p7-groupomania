const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
  .is().min(8)
  .is().max(32)
  .has().not().spaces()
  .has().uppercase()
  .has().lowercase()
  .has().digits();

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    res.status(400).json({
      error:
        "Votre mot de passe ne remplit pas les critères suivants : " +
        passwordSchema.validate(req.body.password, { list: true })
    })
  }
};
