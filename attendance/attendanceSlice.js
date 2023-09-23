import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GET_ALL_Attendances = "http://localhost:8585/api/attendance/all";
const CREATE_ATTENDANCE = "http://localhost:8585/api/attendance/create";
const EDIT_Attendance = "http://localhost:8585/api/attendance/update";

export const createAttendance = createAsyncThunk(
  "attendance/createAttendance",
  async (data) => {
    console.log("Create Serve");
    const response = await axios.post(CREATE_ATTENDANCE, data);
    return response.data;
  }
);

export const fetchAllAttendances = createAsyncThunk(
  "attendaces/fetchAllAttendances",
  async () => {
    const response = await axios.get(GET_ALL_Attendances);
    return response.data;
  }
);

export const updateAttendance = createAsyncThunk(
  "attendance/updateAttendance",
  async (data) => {
    const response = await axios.patch(EDIT_Attendance, data);
    return response.data;
  }
);

const initialState = {
  attendances: [],
  status: "idle",
  error: null,
};

export const attendanceSlice = createSlice({
  name: "attendances",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(createAttendance.fulfilled, (state, action) => {
        state.status = "succeed";
        // state.attendances.push(Number(action.payload))
      })
      .addCase(fetchAllAttendances.fulfilled, (state, action) => {
        state.attendances = action.payload;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        //state.status = 'succeed'
        // const subject = action.payload
        // const subjects = state.subjects.filter(t => t.id !== subject.id)
        // state.subjects = [...subjects,subject]
      });
  },
});

export const getAllAttendances = (state) => state.attendances?.attendances;

export const { addAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
