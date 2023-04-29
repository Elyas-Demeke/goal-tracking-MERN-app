const express = require("express");
const router = express.Router();

const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const {protect} = require('../middleware/authMiddleware')

router.route("/").get(protect, getGoals).post(protect, setGoal); // shortened for of the bottom commentend lines

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal); // shortened for of the bottom commentend lines

// router.get('/', getGoals)

// router.post('/', setGoal)

// router.put('/:id',updateGoal)

// router.delete('/:id',deleteGoal)

module.exports = router;
