import { useSelector } from "react-redux"
import { Navigation } from "../../components/Navigation"
import { Flex, Heading } from "@chakra-ui/react"
import { flexMiddleContainerStyle, flexMiddleOuterContainerStyle } from "../../styles"
import { DisplayPost } from "../components/DisplayPost"

const Bookmark = () => {
    const {authUser} = useSelector((state) => state.authentication)
    const {posts} = useSelector((state) => state.posts)

    const getPost = (postId) => posts.filter((currPost) => currPost._id === postId)[0]

    return (
        <>
        <Navigation/>
        <Flex {...flexMiddleOuterContainerStyle}>
            {/* Sidebar here */}
            <Flex {...flexMiddleContainerStyle}>
                {
                    authUser.bookmarks.length === 0 ? (
                        <Heading marginTop='15'>
                            No Bookmarks Found!
                        </Heading>
                    ) : (
                        <>
                        <Heading marginTop='5'>
                            Your Bookmarks
                        </Heading>
                        {authUser.bookmarks.map((postId) => (
                            <DisplayPost post={getPost(postId)}/>
                        ))}
                        </>
                    )
                }
            </Flex>
            {/* Suggestions here */}
        </Flex>
        {/* Footer here */}
        </>
    )
}   

export {Bookmark}