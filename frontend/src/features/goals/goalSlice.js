import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const deleteGoal = createAsyncThunk("goals/deleteGoal", async (id, thunkApi) => {
  console.log('id', id);
  try {
    const token = thunkApi.getState().auth.user.token
    return goalService.deleteGoal(id, token)
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
  }
})

export const addGoal = createAsyncThunk("goals/addGoal", async (goalData, thunkApi) => {
  try{
    const token = thunkApi.getState().auth.user.token
    return goalService.addGoal(goalData, token)
  }catch(error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
  }
})

export const getGoals = createAsyncThunk("goals/getGoals", async (_ ,thunkApi) => {
  try{
    const token = thunkApi.getState().auth.user.token
    return goalService.getGoals(token)
  }catch(error) {
    const message = (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();
    return thunkApi.rejectWithValue(message)
  }
})

export const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
      reset: (state) => initialState
    },
    extraReducers: (builder) => {
      builder
        .addCase(addGoal.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addGoal.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.goals.push(action.payload)
        })
        .addCase(addGoal.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getGoals.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteGoal.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.goals = state.goals.filter(goal => goal._id !== action.payload.id)
        })
        .addCase(deleteGoal.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
  });
  
  export const { reset } = goalsSlice.actions;
  export default goalsSlice.reducer;
  