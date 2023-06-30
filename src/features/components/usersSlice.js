import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../services/userService";
import { followUserInServer, unfollowUserInServer } from "../../services/followService";
import { editUserProfile, logoutUser } from "../authentication/authenticationSlice";
import { toast } from "react-toastify";

const getUsers = createAsyncThunk(
    "/users/getUsers",
    async () => {
        try {
            const response = await getAllUsers();
            return response.data.users;
        }
        catch (error) {
            console.error(error.response.data);
        }
    }
)

const followUser = createAsyncThunk(
    "/users/followUser",
    async ({followUserId, authToken, dispatch}, {rejectWithValue}) => {
        try {
            const response = await followUserInServer(followUserId, authToken)
            dispatch(editUserProfile({userDetails: response.data.user, authToken}))
            return response.data;
        }
        catch (error) {
            console.error(error.response.data);
            toast.error("Unable to follow user.");
            return rejectWithValue(error.response.data);
        }
    }
)

const unfollowUser = createAsyncThunk(
    "/users/unfollowUser",
    async ({followUserId, authToken, dispatch }, {rejectWithValue}) => {
        try {
            const response = await unfollowUserInServer(followUserId, authToken);
            dispatch(editUserProfile({ userDetails: response.data.user, authToken }));
            return response.data;
        }
        catch (error) {
            console.error(error.response.data);
            toast.error("Unable to unfollow user.");
            return rejectWithValue(error.response.data);
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState : {
        users: [],
        followStatus: "idle",
    },
    reducers : {},
    extraReducers : {
        [logoutUser] : (state) => {
            state.users = [];
        },
        [getUsers.fulfilled] : (state, action) => {
            state.users = action.payload;
        },
        [followUser.fulfilled] : (state, action) => {
            state.users = [...state.users].map((currUser) =>
                currUser._id === action.payload.followUser._id
                ? action.payload.followUser
                : currUser
            )
            state.followStatus = "fulfilled";
        },
        [unfollowUser.fulfilled] : (state, action) => {
            state.users = [...state.users].map((currUser) =>
            currUser._id === action.payload.followUser._id
              ? action.payload.followUser
              : currUser
          );
          state.followStatus = "fulfilled";
        },
        [followUser.pending] : (state, action) => {
            state.followStatus = "pending";
        },
        [unfollowUser.pending] : (state, action) => {
            state.followStatus = "pending";
        },
        [followUser.rejected] : (state, action) => {
            console.error(action.payload);
            state.followStatus = "idle";
        },
        [unfollowUser.rejected]: (state, action) => {
            console.error(action.payload);
            state.followStatus = "idle";
        },   
    }
})

export {getUsers,followUser,unfollowUser}
export const usersReducer = usersSlice.reducer;