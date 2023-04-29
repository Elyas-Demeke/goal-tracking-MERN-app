const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id });

  res.status(200).json(goals);
});

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  
  // const goal = await Goal({ // works as well
  //     text: req.body.text
  // }).save()

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  });

  res.status(200).json(goal);
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  
  if (!goal) {
    res.status(404);
    throw new Error(`goal with id: ${req.params.id} doesn't exist`);
  }
  
  // make sure the logged in user matches the goal user
  if(goal.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error("You don't have acces to this goal")
  }

  const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateGoal);
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  
  if (!goal) {
    res.status(404);
    throw new Error(`goal with id: ${req.params.id} doesn't exist`);
  }

  // make sure the logged in user matches the goal user
  if(goal.user.toString() !== req.user.id) {
    res.status(403)
    throw new Error("You don't have acces to this goal")
  }

  await Goal.findByIdAndDelete(req.params.id)
  
  res.status(200).json({id: req.params.id});
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
