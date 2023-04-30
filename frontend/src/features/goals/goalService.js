import axios from "axios";

const API_URL = "/api/goals/";

// Delete goal
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

// Adds a goal
const addGoal = async (goalData, token) => {
  const response = await axios.post(API_URL, goalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Gets all current user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const goalService = {
  deleteGoal,
  addGoal,
  getGoals,
};

export default goalService;
