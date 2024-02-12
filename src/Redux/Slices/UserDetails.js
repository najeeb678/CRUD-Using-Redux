// Import necessary libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
  searchedData: [],
};

// Create Operation
export const addUser = createAsyncThunk(
  "userDetail/addUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "https://65b4afeb41db5efd2866c464.mockapi.io/Crud",
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Read Operation
export const showUsers = createAsyncThunk("userDetail/showUsers", async () => {
  try {
    const response = await axios.get(
      "https://65b4afeb41db5efd2866c464.mockapi.io/Crud"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Delete Operation
export const deleteUser = createAsyncThunk(
  "userDetail/deleteUser",
  async (id) => {
    try {
      await axios.delete(
        `https://65b4afeb41db5efd2866c464.mockapi.io/Crud/${id}`
      );
      return id; // Return the deleted user's id
    } catch (error) {
      throw error;
    }
  }
);
//Delete All Operation
// export const deleteAllUsers = createAsyncThunk(
//   "userDetail/deleteAllUsers",
//   async () => {
//     console.log("delete all users");
//     try {
//       await axios.delete("https://65b4afeb41db5efd2866c464.mockapi.io/Crud/deleteAll",{});
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// Update Operation
export const updateUser = createAsyncThunk(
  "userDetail/updateUser",

  async ({ id, ...userData }) => {
    console.log("async updateUser", userData);
    try {
      const response = await axios.put(
        `https://65b4afeb41db5efd2866c464.mockapi.io/Crud/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create a slice
const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,

  reducers: {
    searchedUser: (state, action) => {
      state.searchedData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(showUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(deleteAllUsers.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(deleteAllUsers.fulfilled, (state) => {
      //   state.loading = false;

      //   state.users = [];
      // })
      // .addCase(deleteAllUsers.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userDetailSlice.reducer;
export const { searchedUser } = userDetailSlice.actions;
