const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const generateToken = (id) => {
  // Replace 'your-secret-key' with your actual secret key for JWT
  const token = jwt.sign({ id }, "zia182810", {
    expiresIn: "30d", // Token expires in 1 hour, adjust as needed
  });
  return token;
};

// register new user and method is post
// post/api/user
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (email && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// register new user and method is post
// post/api/user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  // check user exist or not
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// get  user and method is get
// get/api/user
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.json({
    id: _id,
    name,
    email,
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
