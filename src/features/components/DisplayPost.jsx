import { Avatar, Box, Divider, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useAccordion } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { displayCardStyle, fontAwesomeIconStyle, postCardStyle } from "../../styles"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faBookmark } from "@fortawesome/free-regular-svg-icons"
import { deletePost, dislikePost, likePost } from "./postsSlice"
import { addToBookmark, removeFromBookmark } from "../authentication/authenticationSlice"
import { toast } from "react-toastify"
import { CommentModal } from "./CommentModal"

const DisplayPost = ({post}) => {
    const {createdAt,content,mediaURL,username} = post
    const [userDetails,setUserDetails] = useState(null)
    const {users} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const {authToken,authUser} = useSelector((state) => state.authentication)

    useEffect(() => {
        if(users.length > 0) 
            setUserDetails(users.filter((user) => user.username === username)[0])
    },[users,userName])

    //add on click functionalities here
    const likedByUser = () => post.likes.likedBy.filter((user) => user._id === authUser._id).length !== 0;

    const likeClickHandler = () => {
        if(likedByUser())
            dispatch(dislikePost({postId: post._id, authToken}))
        else 
            dispatch(likePost({postId: post._id, authToken}))
    }

    const bookmarkedByUser = () => authUser.bookmarks.filter((postId) => postId===post._id).length !== 0;

    const bookmarkClickHandler = () => {
        if(bookmarkedByUser()) {
            dispatch(removeFromBookmark({postId: post._id, authToken}))
            toast.success("Post removed from Bookmarks")
        } else {
            dispatch(addToBookmark({postId: post._id, authToken}));
            toast.success("Post added to Bookmarks")
        }
    }

    return (
        <>
            {userDetails && (
                <Flex {...displayCardStyle} {...postCardStyle}>
                    <Flex
                        alignSelf="flex-start"
                        flexWrap="wrap"
                        alignItems="center"
                        columnGap="1"
                        width="90%"
                        >
                            <Link to={`/profile/${username}`}>
                            <Flex>
                                <Avatar
                                    src= {
                                        userDetails.username === authUser.username
                                        ? authUser.avatarUrl
                                        : userDetails.avatarUrl
                                    }
                                    alt="profile-picture"
                                    size="md"
                                    marginRight="1.5"
                                    display="block"
                                    name={userDetails.firstName} />
                                <Flex flexDirection="column">
                                    <Flex columnGap="12.5px">
                                        <Text fontWeight="bold">
                                        {`${userDetails.firstName} ${userDetails.lastName}`}
                                        </Text>
                                        <Text fontSize="sm" alignSelf="center">
                                        {` ${new Date(createdAt)
                                            .toDateString()
                                            .split(" ")
                                            .slice(1, 4)
                                            .join(" ")}`}
                                        </Text>
                                    </Flex>
                                    <Text fontSize="sm"> @{username}</Text>
                                </Flex>
                                </Flex>
                            </Link>

                            {authUser.username === userDetails.username && (
                                <Menu>
                                    <MenuButton
                                        position='absolute'
                                        background='transparent'
                                        color='blue.800'
                                        right='7'
                                        _hover={{background : 'transparent'}}
                                    >
                                        <FontAwesomeIcon
                                            icon='ellipsis-h'
                                            style={{...fontAwesomeIconStyle, padding:'6px'}}
                                        />                                                                                                                                                                                          
                                    </MenuButton>
                                    <MenuList minWidth='8.25rem'>
                                        <MenuGroup>
                                            {/* Edit Post Here */}
                                            <MenuDivider/>
                                            <MenuItem>
                                                Delete
                                            </MenuItem>
                                        </MenuGroup>
                                    </MenuList>
                                </Menu>
                            )
                        }
                    </Flex>
                    <Link to={`/post/${post._id}`}>
                        <Text>
                            {content}
                        </Text>
                        {
                            mediaURL && mediaURL.split("/")[4] === "image" ? (
                                <Image
                                    src={mediaURL}
                                    maxHeight="20rem"
                                    objectFit="fill"
                                    marginLeft="0"
                                    width="100%" />
                            ) : (
                                mediaURL && (
                                    <video controls>
                                        <source src={mediaURL}/>
                                    </video>
                                )
                            )
                        }
                    </Link>
                    <Divider/>
                    <HStack alignSelf="flex-start">
                        <Flex alignItems="center" flexDirection='column'>
                            <IconButton 
                                variant="iconButton"
                                icon = {
                                    likedByUser() ? (
                                        <FontAwesomeIcon icon='heart' style={{ color: "#F64E3A" }}/>
                                    ) : (
                                        <FontAwesomeIcon icon={faHeart}/>
                                    )
                                }
                                onClick={(e) => likeClickHandler()}
                            />
                            <span>{post.likes.likecount > 0 && post.likes.likecount}</span>
                        </Flex>
                        <IconButton
                            variant="iconButton"
                            icon={
                                bookmarkedByUser() ? (
                                    <FontAwesomeIcon icon='bookmark'/>
                                ) : (
                                    <FontAwesomeIcon icon={{faBookmark}}/>
                                )
                            }
                            onClick={(e) => bookmarkClickHandler(e)}
                            />
                            <Box>
                                <CommentModal postId={post._id}/>
                                {
                                    post.commments.length > 0 && <span>{post.commments.length}</span>
                                }
                            </Box>
                    </HStack>
                </Flex>
            )}
        </>
    )

}

export {DisplayPost}