import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endPoints } from "src/api";
import { getUser } from "src/service";

interface userStateProps {
  user: any;
  isAuthenticated: boolean;
}

// async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk<{ data: {} }, number>(
  endPoints.auth.getUser,
  async (id, { rejectWithValue }) => {
    try {
      const response = await getUser(id);
      return { data: response };
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const initialState: userStateProps = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.user = { user: { ...(state.user?.user ?? {}), ...data } };
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;
export const selectIsAuthenticated = (state: any) => state.user.isAuthenticated;

export default userSlice.reducer;
