const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");

// get req to get goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  console.log(goals);
  res.status(200).json(goals);
});

// post req to set goals
const setGoals = asyncHandler(async (req, res) => {
  // add midleware to get text req in body
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter text input field");
  }

  const goals = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goals);
});

// put req to update goals
const putGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.findById(req.params.id);

  if (!goals) {
    res.status(400);
    throw new Error("Goals not found");
  }

  const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateGoals);
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
