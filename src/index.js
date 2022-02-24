
const express = require("express");

const connect = require("./configs/db");

const userController = require("./controllers/user.controller");
const upload = require("./middleware/file")

const { register, login } = require("./controllers/auth.controller");
const { body } = require('express-validator');
const User = require("./models/user.model");

const app = express();

app.use(express.json());

app.use("/user",userController)

app.post("/register",body("name").isString().isLength({min:3,max:15}),
body("email").isEmail().custom(async(value) => {
 const user = await User.findOne({email: value})
      if (user) {
       throw new Error('E-mail already in use');
      }
  return true
  }),
  body("contact").isNumeric().isLength({min:10,max:10}), 
  body("userId").isAlphanumeric(),upload.single("pic"),


register);












































// .login
app.post("/login",
body("userId").isAlphanumeric(),
 login);




app.listen(2345, async () => {
    try {
      await connect();
    } catch (err) {
      console.error(err.message);
    }
    console.log("listening on port 2345");
  });