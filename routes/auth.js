const router = require("express").Router();
const User = require("../models/User");
const dbConnection = require("../dbConnection/dbConnection");

router.get("/users", (req, res) => {
  User.findAll()
    .then(user => {
      console.log(user);
      res.sendStatus(200);
    })
    .catch(err => console.log("Error: " + err));
});

router.post("/register", (req, res) => {
  const { name, email, password, date } = req.body;
  console.log(name);
  User.create({
    name: name,
    email: email,
    password: password,
    date: date
  })
    .then(gig => res.redirect("/users"))
    .catch(err => console.log("Error creating: " + err));
});

// router.post('/login',(req,res)=>{

// })

module.exports = router;
