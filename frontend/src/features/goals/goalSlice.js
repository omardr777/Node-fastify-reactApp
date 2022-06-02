import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [], //
    goal: {},
    isError: false, //
    isSuccess: false, //
    isLoading: false, //
    message: ''
}

export const createGoal = createAsyncThunk('goal/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (err) {
        const message = (err.response && err.response.data.message && err.response.data) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getGoal = createAsyncThunk('goal/getGoal', async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const goals = thunkAPI.getState().goals.goals
        // return await goalService.getGoal(goalId, token)
        return goals.find(goal => goal._id === goalId)
    } catch (err) {
        const message = (err.response && err.response.data.message && err.response.data) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const getGoals = createAsyncThunk('goal/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (err) {
        const message = (err.response && err.response.data.message && err.response.data) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteGoal = createAsyncThunk('goal/delete', async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(goalId, token)
    }
    catch (err) {
        const message = (err.response && err.response.data.message && err.response.data) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateGoal = createAsyncThunk('goal/update', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.updateGoal(goalData, token)
    }
    catch (err) {
        const message = (err.response && err.response.data.message && err.response.data) || err.message || err.toString()
        return thunkAPI.rejectWithValue(message);
    }
})


export const goalSlice = createSlice({
    name: 'goal', //
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.iaSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.iaSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.iaSuccess = true;
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.iaSuccess = true;
                console.log('action payload', action);
                // state.goals = state.goals.map(goal => goal._id == action.payload.id ? action.payload : goal)
                state.goals.map(goal => {
                    if (goal._id == action.payload.id) {
                        goal.text = action.payload.text;
                        goal.date = action.payload.date;
                        goal.done = action.payload.done
                    }
                })
                state.goal = action.payload
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
            .addCase(getGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.iaSuccess = true;
                console.log('action payload', action);
                state.goal = action.payload
            })
            .addCase(getGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload
            })
    }
});

export const { reset } = goalSlice.actions
export default goalSlice.reducer;
