//Validation
const Joi = require("../node_modules/@hapi/joi");

//Register Validation

const registerValidation = data => {
  const userSchema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  const { error } = userSchema.validate(data);

  return error;
};

const loginValidation = data => {
  const userSchema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  const { error } = userSchema.validate(data);

  return error;
};

module.exports = {
  registerValidation,
  loginValidation
};
