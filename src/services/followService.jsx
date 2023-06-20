import axios from "axios";

const followUser = (followUserId, authorization) => {
    return axios.post(`/api/users/follow/${followUserId}`, {}, {headers : {authorization}})
}

const unfollowUser = (followUserId, authorization) => {
    return axios.post(`/api/users/unfollow/${followUserId}`, {}, {headers : {authorization}})
}

export {followUser,unfollowUser}