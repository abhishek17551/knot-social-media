import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Navigation } from "../../components/Navigation"
import { Flex } from "@chakra-ui/react"
import { DisplayPost } from "./DisplayPost"
import { Comment } from "./Comment"

const SinglePostPage = () => {
    const {postId} = useParams()
    const {posts} = useSelector((state) => state.posts)
    const [post,setPost] = useState(null)

    useEffect(() => {
        if(postId && posts)     
            setPost(posts.filter((currPost) => currPost._id === postId)[0])
    },[posts])

    return (
        <>
            <Navigation/>
            <Flex>
                {/* Sidebar here */}
                {
                    post && (
                        <Flex>
                            <DisplayPost post={post}/>
                            {
                                post.comments && 
                                post.comments.map((comment) => (
                                    <Flex key={comment._id}>
                                        <Comment comment={comment} postId={post._id}/>
                                    </Flex>
                                ))
                            }
                        </Flex>
                    )
                }
                {/* Suggestions here */}
            </Flex>
        </>
    )
}