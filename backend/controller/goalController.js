const asyncHandler = require("express-async-handler");

// get req to get goals
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get goals",
  });
});

// post req to set goals
const setGoals = asyncHandler(async (req, res) => {
  // add midleware to get text req in body
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter text input field");
  }

  res.status(200).json({
    message: "set goals",
  });
});

// put req to update goals
const putGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `update goals ${req.param.id}`,
  });
});

// del req to delete goals
const delGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `delete goals ${req.param.id}`,
  });
});

module.exports = {
  getGoals,
  setGoals,
  putGoals,
  delGoals,
};
