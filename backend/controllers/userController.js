const asyncHandler = require('express-async-handler');
//for hasing the password
const bcrypt = require('bcryptjs');

//jwt
const jwt = require('jsonwebtoken');

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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error('Invalid user data');
  }
});

//@desc   Login the user
//@router /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //check user nd passwords match with the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Inavlid Credentials');
  }
});

//@desc  get current user
//@router /api/user/me
//@access Private

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

//To generate the token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
