const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");

// get req to get goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user:req.user.id});
  // console.log(goals);
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
    user:req.user.id,
  });

  res.status(200).json(goals);
});

// put req to update goals
const putGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.findById(req.params.id);

  // check user
  if(!req.user){
    res.status(401)
    throw new Error('user not found')
  }

  if (!goals) {
    res.status(400);
    throw new Error("Goals not found");
  }

  if(goals.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized ')
  }

  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('user not found')
  }
  if(goals.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized ')
  }

  const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateGoals);
});

// del req to delete goals
const delGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.findById(req.params.id)

  if(!goals){
    res.status(401)
    throw new Error('user not found')
  }

  if(goals.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('user not authorized ')
  }

  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('user not found')
  }
  if(goals.user.toString() !== user.id){
    res.status(401)
    throw new Error('User not authorized ')
  }


  await goals.remove()

  res.status(200).json({
    id: `delete goals ${req.params.id}`,
  });
});

module.exports = {
  getGoals,
  setGoals,
  putGoals,
  delGoals,
};
