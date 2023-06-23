import { useReducer } from "react"
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"

const useSignupHandler = () => {
    const {users} = useSelector((state) => state.users)

    const formInitialState = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    }

    const errorInitialState = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    }

    const formreducer = (state,action) => {
        switch(action.type) {
            case "INPUT_FIRST_NAME" : 
                return {
                    ...state,
                    firstName:action.payload
                };
            case "INPUT_LAST_NAME" : 
                return {
                    ...state,
                    lastName:action.payload
            };
            case "INPUT_USERNAME":
                return {
                    ...state,
                    username:action.payload
                };
            case "INPUT_EMAIL":
                return {
                    ...state,
                    email: action.payload
                };
            case "INPUT_PASSWORD":
                return {
                    ...state,
                    password:action.payload
                }
        }
    }

    const errorReducer = (state,action) => {
        switch(action.type) {
            case "ERROR_FIRST_NAME" : 
            return {
                ...state,
                firstName:action.payload
            };
        case "ERROR_LAST_NAME" : 
            return {
                ...state,
                lastName:action.payload
        };
        case "ERROR_USERNAME":
            return {
                ...state,
                username:action.payload
            };
        case "ERROR_EMAIL":
            return {
                ...state,
                email: action.payload
            };
        case "ERROR_PASSWORD":
            return {
                ...state,
                password:action.payload
            }

        }
    }

    const [formData,formDispatch] = useReducer(formreducer,formInitialState)
    const [errorData,errorDispatch] = useReducer(errorReducer,errorInitialState)

    const dispatch = useDispatch();

    const checkValidation = () => {
        let signupFlag = true;

        if (!new RegExp("^[a-zA-Z]+$").test(formData.firstName)) {
            errorDispatch({
              type: "ERROR_FIRST_NAME",
              payload: "Please enter valid First Name",
            });
            signupFlag = false;
          }
        
        if (!new RegExp("^[a-zA-Z]+$").test(formData.lastName)) {
            errorDispatch({
              type: "ERROR_LAST_NAME",
              payload: "Please enter valid Last Name",
            });
            signupFlag = false;
        }

        if (!new RegExp("^[a-z0-9_.]+$").test(formData.username)) {
            errorDispatch({
              type: "ERROR_USERNAME",
              payload: "Username can contain digits, letters,  _ and . only",
            });
            signupFlag = false;
        }

        if (!new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(formData.email)) {
            errorDispatch({
              type: "ERROR_EMAIL",
              payload: " Please enter valid email",
            });
            signupFlag = false;
        }

        if(!new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}").test(formData.password)) {
            errorDispatch({
                type: "ERROR_PASSWORD",
                payload:
                  "Password should contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 digit and 1 special character",
            });
            signupFlag = false;
        }

        return signupFlag;
    }

    const signupHandler = (e) => {
        e.preventDefault();
        if(checkValidation()) {
            const userNameExists = users.find((user) => user.username === formData.username)

            userNameExists ? 
            toast.error('The entered Username already exists') :
            dispatch(signupUser(formData))

        }
    }  

    return {formData,errorData,formDispatch,errorDispatch,signupHandler}

}

export {useSignupHandler}

