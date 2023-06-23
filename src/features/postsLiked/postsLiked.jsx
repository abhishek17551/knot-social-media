import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigation } from '../../components/Navigation';
import { Flex, Heading } from '@chakra-ui/react';
import { flexMiddleOuterContainerStyle } from '../../styles';
import { DisplayPost } from '../components/DisplayPost';

export default function PostsLiked() {
    const {authUser} = useSelector((state) => state.authentication)
    const { posts } = useSelector((state) => state.posts);
    const [postsLikedByUser,setPostsLikedByUser] = useState([])

    useEffect(() => {
        setPostsLikedByUser(posts.filter((currPost) =>
            currPost.likes.likedBy.find((user) => user.username === authUser?.username)
        ))
    },[posts])
  return (
    <div>
        <Navigation/>
        <Flex {...flexMiddleOuterContainerStyle}>
            {/* sidebar here */}
            <Flex {...flexMiddleContainerStyle}>
                {
                    postsLikedByUser.length === 0 ? (
                        <Heading marginTop='15'>
                            No Posts are liked yet!
                        </Heading>
                    ) : (
                        <>
                         <Heading size='md' marginTop='5'>
                            Posts you have liked
                        </Heading>
                        {
                            postsLikedByUser.map((post) => (
                                <DisplayPost key={post._id} post={post}/>
                            ))
                        }
                        </>
                    )
                }
            </Flex>
            {/* suggestions here */}
        </Flex>
        {/* footer here */}
    </div>
  )
}

export {PostsLiked}