import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../lib/instance";

export const getUser = createAsyncThunk(
  "user/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get("/user");
      const result = await res.data;
      return result;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk("user/getById", async (data, { rejectWithValue }) => {
  const response = await instance.get(`/user/${data}`);
  const result = await response.data[0];
  console.log(result);
  return result;
})

export const getClassList = createAsyncThunk(
  "class/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await instance.get("/class");
      const result = await res.data;
      return result;
    } catch (error) {
      console.error(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.post("/user/create", data);
      const result = await res.data;
      return result;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/edit",
  async (data, { rejectWithValue }) => {
    try {
      const res = await instance.patch(`/user/update/${data.id}`, data);
      const result = await res.data;
      return result;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await instance.delete(`/user/${id}`);
      const result = await res.data;
      return result;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = [action.payload];
      state.error = null;
      state.success = true;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
      state.success = false;
    });
    // Add User
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = [action.payload];
      state.error = null;
      state.success = true;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
      state.success = false;
    });
    // Get Class List
    builder.addCase(getClassList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getClassList.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
      state.success = true;
    });
    builder.addCase(getClassList.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
      state.success = false;
    });
  },
});

export default userSlice.reducer;
