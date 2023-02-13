import instance from "../../lib/instance";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

export const getUserMongo = createAsyncThunk(
  "user/mongo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/mongouser");
      const data = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserByIdMongo = createAsyncThunk(
  "user/id",
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/mongouser/${data}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserMongo = createAsyncThunk(
  "user/delete",
  async (data, { rejectWithValue }) => {
    try {
      await instance.delete(`/mongouser/${data}`);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUserMongo = createAsyncThunk(
  "user/add",
  async (data, { rejectWithValue }) => {
    try {
      await instance.post(`/mongouser`, data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  users: [],
  loading: false,
  error: null,
  success: null,
  flashMessage: null
};

const userMongoSlice = createSlice({
  name: "userMongo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Users
    builder.addCase(getUserMongo.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(getUserMongo.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getUserMongo.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
      state.success = false;
    });
    // Get User By Id
    builder.addCase(getUserByIdMongo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserByIdMongo.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getUserByIdMongo.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
      state.success = false;
    });
    // Delete User
    builder.addCase(deleteUserMongo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUserMongo.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(deleteUserMongo.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
      state.success = false;
    });
    // Add User
    builder.addCase(addUserMongo.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(addUserMongo.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
      state.success = true;
      state.flashMessage = true;
    });
    builder.addCase(addUserMongo.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default userMongoSlice.reducer;
