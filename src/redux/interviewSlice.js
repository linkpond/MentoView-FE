import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interviewId: null,
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setInterviewId: (state, action) => {
      state.interviewId = action.payload;
    },
  },
});

export const { setInterviewId } = interviewSlice.actions;
export default interviewSlice.reducer;
