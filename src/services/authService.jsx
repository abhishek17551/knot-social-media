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

const addBookmark = (postId, authorization) => 
    axios.post(`/api/users/bookmark/${postId}`, {} ,
    {
        headers : {authorization}
    })

const removeBookmark = (postId, authorization) => 
axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: { authorization },
    })

export {
    postSignUpData,
    postLoginData,
    addBookmark,
    removeBookmark
}