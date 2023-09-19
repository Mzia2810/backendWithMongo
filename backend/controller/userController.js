// register new user and method is post
// post/api/user
const loginUser = (req, res) => {
  res.json({
    name: "Muhammad Zia",
    email: "mziaofficial@gmail.com",
    message: "Login user",
  });
};
// register new user and method is post
// post/api/user
const registerUser = (req, res) => {
  res.json({
    name: "Muhammad Zia",
    age: 22,
    message: "register user",
  });
};
// get  user and method is get
// get/api/user
const getMe = (req, res) => {
  res.json({
    message: "user data display",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
