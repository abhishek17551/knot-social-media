import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../services/userService";
import { getAllPostsOfUser } from "../../services/postService";
import { logoutUser } from "../authentication/authenticationSlice";

const loadUserDetails = createAsyncThunk(
    "/profile/loadUserDetails",
    async(username,{rejectWithValue}) => {
        try {
            const res = await getUser(username)
            return res.data.user;
        }
        catch(error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data)
        }
    }
)

const loadUserPosts = createAsyncThunk (
    "/profile/loadUserPosts",
    async(username,{rejectWithValue}) => {
        try {
            const res = await getAllPostsOfUser(username);
            return res.data.posts
        }
        catch(error) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data)
        }
    }
)

const profileSlice = createSlice(
    {
        name : "profile",
        initialState : {
            profileDetails : null,
            postsDetails : []
        },
        reducers : {},
        extraReducers : {
            [logoutUser] : (state) => {
                state.profileDetails = null;
                state.postsDetails = []
            },
            [loadUserDetails.fulfilled] : (state,action) => {
                state.profileDetails = action.payload
            },
            [loadUserDetails.rejected] : (state,action) => {
                console.error(action.payload)
            },
            [loadUserPosts.fulfilled] : (state,action) => {
                state.postsDetails = action.payload
            },
            [loadUserPosts.rejected] : (state,action) => {
                console.error(action.payload)
            }
            
        }
    }
)

export {loadUserDetails,loadUserPosts}
export const {resetProfile} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;