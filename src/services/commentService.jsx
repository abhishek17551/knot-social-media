import axios from "axios";

const getCommentsOfPost = (postId) => axios.get(`/api/comments/${postId}`)

const addCommentsToPost = (postId,commentData,authorization) => 
    axios.post(`/api/comments/add/${postId}`, {commentData}, {headers:{authorization}});

const editComment = (postId,commentId,commentData,authorization) => 
    axios.post(`/api/comments/edit/${postId}/${commentId}`, {commentData}, {headers:{authorization}})

const deleteComment = (postId,commentId,authorization) => 
    axios.delete(`/api/comments/delete/${postId}/${commentId}`,{headers:{authorization}})

export {getCommentsOfPost,addCommentsToPost,editComment,deleteComment}