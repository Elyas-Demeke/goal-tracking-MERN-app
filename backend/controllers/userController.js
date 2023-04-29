const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("fill all fields");
  }

  // check if user exists before creating
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticates a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  if(!email || !password) {
    res.status(400)
    throw new Error('fill all fields')
  }
  const user = await User.findOne({email})

  if(!user) {
    res.status(400)
    throw new Error(`user with email ${email} doesn't exist`)
  }
  const verifyPassword = await bcrypt.compare(password, user.password)
  if(verifyPassword) {
    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
    })
  } else {
    res.status(401).json({
        message: 'wrong password'
    })
  }
});

// @desc Gets user date
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  if(req.user)
    res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    })
  else{
    res.status(401)
    throw new Error('Not authroized')
  }
});

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
