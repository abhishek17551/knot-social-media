import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUser, postLoginData, postSignUpData } from "../../services/authService";
import { toast } from "react-toastify";

const loginUser = createAsyncThunk(
    "authenticate/loginUser",
    async({username,password}, {rejectWithValue}) => {
        try {
            const loginRes = await postLoginData(username,password);
            return loginRes.data
        }

        catch (error) {
            toast.error(`Entered Username or Password is incorrect!`);
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

const signupUser = createAsyncThunk(
    "authenticate/signupUser",
    async(userDetails, {rejectWithValue}) => {
        try {
            const signupRes = await postSignUpData(userDetails);
            return signupRes.data;
        }

        catch (error) {
            toast.error("Error in Signup. Please try again!")
            console.error(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)

const editUserProfile = createAsyncThunk(
    'authenticate/editUserProfile',
    async({userDetails, authToken}, {rejectWithValue}) => {
        try {
            const res = await editUser(userDetails, authToken);
            return res.data.user;
        }

        catch(error) {
            toast.error("Unable Edit Profile! Please try again!");
            console.error(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)

const addToBookmark = createAsyncThunk(
    "authenticate/addBookmark",
    async({postId, authToken},{rejectWithValue}) => {
        try {
            const res = await addBookmarkInServer(postId, authToken);
            return res.data.bookmarks;
        }

        catch(error) {
            toast.error("Unable to add to Bookmarks.");
            console.error(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)

const removeFromBookmark = createAsyncThunk(
    "authenticate/removeBookmark",
    async({postId, authToken},{rejectWithValue}) => {
        try {
            const res = await removeBookmarkFromServer(postId, authToken);
            return res.data.bookmarks; 
        }

        catch(error) {
            toast.error("Unable to remove from Bookmarks!");
            console.error(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    authToken : localStorage.getItem("authToken") ?? "",
    authUser : JSON.parse(localStorage.getItem('authUser')) ?? {},
    authStatus: "idle",
    authError: null,
    bookmarkStatus: "idle",
    bookmarkError: null,
    editProfileStatus: "idle"
}

const authenticationSlice = createSlice(
    {
        name : 'authentication',
        initialState,
        reducers : {
            logoutUser : (state) => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("authUser");
                state.authToken = null;
                state.authUser = null;
                state.authError = null;
                state.authStatus = "idle";
                toast.success('You have been logged out successfully!')
            }
        },

        extraReducers : {
            [addBookmark.pending]: (state, action) => {
                state.bookmarkStatus = "pending";
            },
            [addBookmark.fulfilled]: (state, action) => {
              state.authUser.bookmarks = action.payload;
              state.bookmarkStatus = "fulfilled";
            },
            [addBookmark.rejected]: (state, action) => {
              state.bookmarkStatus = "rejected";
              state.bookmarkError = action.payload;
            },
            

            [removeBookmark.pending]: (state, action) => {
                state.bookmarkStatus = "pending";
            },
            [removeBookmark.fulfilled]: (state, action) => {
              state.authUser.bookmarks = action.payload;
              state.bookmarkStatus = "fulfilled";
            },
            [removeBookmark.rejected]: (state, action) => {
              state.bookmarkStatus = "rejected";
              state.bookmarkError = action.payload;
            },


            [editUserProfile.pending]: (state, action) => {
                state.editProfileStatus = "pending";
            },
            [editUserProfile.fulfilled]: (state, action) => {
             state.authUser = action.payload;
            },
            [editUserProfile.rejected]: (state, action) => {
              state.authError = action.payload;
            },


            [signupUser.pending]: (state) => {
                state.authStatus = "pending";
            },
            [signupUser.fulfilled]: (state, action) => {
              state.authStatus = "fulfilled";
              state.authToken = action.payload.encodedToken;
              state.authUser = action.payload.createdUser;
              localStorage.setItem("authToken", state.authToken);
              localStorage.setItem("authUser", JSON.stringify(state.authUser));
            },


            [loginUser.pending] : (state) => {
                state.authStatus = 'pending';
            },
            [loginUser.fulfilled] : (state,action) => {
                state.authToken = action.payload.encodedToken;
                state.authUser = action.payload.foundUser;
                state.authStatus = 'fulfilled';
                localStorage.setItem('authUser', JSON.stringify(state.authUser));
                localStorage.setItem('authToken', state.authToken)
            },
            [loginUser.rejected]: (state, action) => {
                state.authStatus = "Error";
                state.authError = action.payload;
            },

        }
    }
)

export {signupUser,editUserProfile,loginUser,addToBookmark,removeFromBookmark}
export const authenticationReducer = authenticationSlice.reducer;
export const {logoutUser} = authenticationSlice.actions;