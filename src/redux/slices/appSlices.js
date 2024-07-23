import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOnboardingCompleted: false,
};

export const appSlices = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action) => {
      state.isOnboardingCompleted = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOnboardingCompleted} = appSlices.actions;

export default appSlices.reducer;
