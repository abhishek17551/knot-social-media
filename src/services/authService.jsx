import axios from "axios"

const postSignUpData = (formData) => 
    axios.post('/api/auth/signup',{
        ...formData,
        website : '',
        avatarURL : '',
        bio : '',
    })
    
const postLoginData = (username, password) => 
    axios.post('/api/auth/login', {
        username,password
    })

const addBookmarkToServer = (postId, authorization) => 
    axios.post(`/api/users/bookmark/${postId}`, {} ,
    {
        headers : {authorization}
    })

const removeBookmarkFromServer = (postId, authorization) => 
axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: { authorization },
    })

const editUser = (userData,authorization) => 
    axios.post("/api/users/edit", {userData}, 
    { 
        headers : {authorization}
    })

export {
    postSignUpData,
    postLoginData,
    addBookmarkToServer,
    removeBookmarkFromServer,
    editUser
}