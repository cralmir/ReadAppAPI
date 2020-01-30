const router = require("express").Router();
const User = require("../models/User");
const dbConnection = require("../dbConnection/dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  registerValidation,
  loginValidation
} = require("../validations/validation");

router.post("/register", async (req, res) => {
  //Lets validate the data
  const error = registerValidation(req.body);

  if (error) {
    const { details } = error;
    return res.status(400).send(details[0].message);
  }

  const { name, email, password, date } = req.body;

  //Check if the user already exists
  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) return res.status(400).send("User already exists");

  //Hash the password
  console.log(password);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Create new user
  const user = new User({
    name,
    email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ id: savedUser.dataValues.id });
  } catch (error) {
    res.status(400).send("Error creating: " + error);
  }
});

//Login
router.post("/login", async (req, res) => {
  //Lets validate the data
  const error = loginValidation(req.body);

  if (error) {
    const { details } = error;
    return res.status(400).send(details[0].message);
  }

  const { name, email, password, date } = req.body;

  //Check if the user  exists
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).send("Email doesn't exists");

  //Password is correct
  const validPass = await bcrypt.compare(password, user.dataValues.password);
  if (!validPass) return res.status(400).send("Invalid password");
  console.log(process.env.TOKEN_SECRET);
  //Create and assing a token
  const token = jwt.sign({ user: user.dataValues }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});
// router.post('/login',(req,res)=>{

// })

module.exports = router;
