const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnection = require("../dbConnection/dbConnection");
const dotEnv = require("dotenv");

//import routes
const authRoute = require("../routes/auth");
const postRoute = require("../routes/post");

dotEnv.config();

//Database connection

dbConnection
  .authenticate()
  .then(() => console.log("Databse Connected..."))
  .catch(error => console.log(`There is an error: ${error}`));

//Middlewares
app.use(bodyParser.json());

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(8888, () => console.log("Server Up and running"));
