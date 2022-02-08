const asyncHandler = require('express-async-handler');
//for hasing the password
const bcrytp = require('bcryptjs');

const User = require('../models/userModel');

//@desc   Register a new user
//@router /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    //throwing custom express error message
    //by doing this express will throw the error message in form of html format.
    //we need to make it avilable in json format
    //so for that we need to create a custom file
    throw new Error('Please include all fields');
  }

  //find is user already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already Exist');
  }

  //Hash the password
  const salt = await bcrytp.genSalt(10);
  const hashedPassword = await bcrytp.hash(password, salt);

  //Create user

  res.send('Register Route');
});

//@desc   Login the user
//@router /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login');
});

module.exports = {
  registerUser,
  loginUser,
};
