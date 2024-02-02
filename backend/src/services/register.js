const Joi = require("joi");
const tables = require("../tables");

const playerSchema = Joi.object({
  firstname: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  lastname: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().max(255).required(),
});

const register = async (req, res, next) => {
  const errors = [];
  const { firstname, lastname, password, email } = req.body;
  console.log(email);
  if (!firstname || !lastname || !password || !email) {
    return res.status(400).json({ error: "Il manque un/ou plusieurs champs" });
  }
  const { error } = playerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).json({ validationErrors: error.details });
  }
  const existEmail = await tables.users.checkEmail(email);
  console.log(existEmail);
  if (existEmail.length !== 0) {
    errors.push({ champ: "email", message: "Email déjà utilisé" });
  }
  if (errors.length !== 0) {
    return res.status(409).json({ validationErrors: errors });
  }
   return next();
};

module.exports = register;
