import axios from "axios";

const getAllPostsFromServer = () => axios.get("/api/posts");

const getPagedPostsFromServer = (pageNum) =>
  axios.get(`/api/posts/page/${pageNum}`);

const getAllPostsOfUserFromServer = (username) =>
  axios.get(`/api/posts/user/${username}`);

const editPostInServer = (postData, authorization) =>
  axios.post(
    `/api/posts/edit/${postData._id}`,
    { postData },
    { headers: { authorization } }
  );

const addPostToServer = (postData, authorization) =>
  axios.post("/api/posts", { postData }, { headers: { authorization } });

const likePostInServer = (postId, authorization) =>
  axios.post(`/api/posts/like/${postId}`, {}, { headers: { authorization } });

const dislikePostInServer = (postId, authorization) => {
    return axios.post(
      `/api/posts/dislike/${postId}`,{},{ headers: { authorization }});
 };

const deletePostFromServer = (postId, authorization) =>
  axios.delete(`/api/posts/${postId}`, { headers: { authorization } });
  
export {
  getAllPostsFromServer,getPagedPostsFromServer,getAllPostsOfUserFromServer,editPostInServer,addPostToServer,likePostInServer,dislikePostInServer,deletePostFromServer
}

