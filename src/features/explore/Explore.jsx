import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPagedPosts } from "../../services/postService"
import { Navigation } from "../../components/Navigation"
import { flexMiddleContainerStyle, flexMiddleOuterContainerStyle } from "../../styles"
import { Box, Flex, Spinner } from "@chakra-ui/react"
import { DisplayPost } from "../components/DisplayPost"

const Explore = () => {
    const [lastPost,setLastPost] = useState()
    const {posts, pagedPosts, pagedPostStatus, pageNum, totalPages} = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    useEffect(() => dispatch(getPagedPosts({pageNum}), [pageNum,posts]))

    return (
        <>
        <Navigation/>
        <Flex {...flexMiddleOuterContainerStyle}>
            {/* Sidebar here */}
            <Flex {...flexMiddleContainerStyle}>
                {pagedPosts.map((post,index) =>
                index === pagedPosts.length -1 && pageNum < totalPages ? (
                   <Box margin='0' padding='0' key={post._id} ref={setLastPost}>
                    <DisplayPost post={post}/>
                   </Box>  
                ) : (
                    <DisplayPost post={post} key={post._id}/>
                )
                )}
                {pagedPostStatus === 'pending' && <Spinner size="lg"/>}
            </Flex>
            {/* Suggestions here */}
        </Flex>
            {/* Footer here */}
        </>
    )
}

export {Explore}