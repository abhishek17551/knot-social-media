import axios from "axios";

const getAllPosts = () => axios.get("/api/posts");

const getPagedPosts = (pageNum) =>
  axios.get(`/api/posts/page/${pageNum}`);

const getAllPostsOfUser = (username) =>
  axios.get(`/api/posts/user/${username}`);

const editPost = (postData, authorization) =>
  axios.post(
    `/api/posts/edit/${postData._id}`,
    { postData },
    { headers: { authorization } }
  );

const addPost = (postData, authorization) =>
  axios.post("/api/posts", { postData }, { headers: { authorization } });

const likePost = (postId, authorization) =>
  axios.post(`/api/posts/like/${postId}`, {}, { headers: { authorization } });

const dislikePost = (postId, authorization) => {
    return axios.post(
      `/api/posts/dislike/${postId}`,{},{ headers: { authorization }});
 };
  
export {getAllPosts,getPagedPosts,getAllPostsOfUser,editPost,addPost,likePost,dislikePost}

