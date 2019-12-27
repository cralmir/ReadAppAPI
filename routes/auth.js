const router = require("express").Router();
const User = require("../models/User");
const dbConnection = require("../dbConnection/dbConnection");

//Validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
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

router.post("/register", (req, res) => {
  //Lets validate the data
  const { error } = schema.validate(req.body);

  res.send(error.details);

  // const { name, email, password, date } = req.body;
  // console.log(name);
  // User.create({
  //   name: name,
  //   email: email,
  //   password: password,
  //   date: date
  // })
  //   .then(gig => res.redirect("/users"))
  //   .catch(err => console.log("Error creating: " + err));
});

// router.post('/login',(req,res)=>{

// })

module.exports = router;
