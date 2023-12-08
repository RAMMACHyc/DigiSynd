const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
 
/**
* @desc    Register new user 
* @route   POST /users
* @access  Public
*/

const registerSyndic = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, payment } = req.body;

  if (!firstName || !lastName || !email || !password || !phone || !payment) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all fields' });
    return;
  }  

  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    firstName,
    lastName, 
    email: email.toLowerCase(),
    password: hashedPassword,
    phone,
    payment,
  });

  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      payment: user.payment,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid user data' });
  }
});


/**
* @desc    Authenticate a user
* @route   POST /users/login
* @access  Public
*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      payment: user.payment,

      token: generateToken(user._id),
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid credentials' });
  }
});

/**
* @desc    Get user data
* @route   GET /users/me
* @access  Private
*/



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerSyndic,
  loginUser,

};
