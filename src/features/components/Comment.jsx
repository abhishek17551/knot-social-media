import { Avatar, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, VStack } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { CommentModal } from "./CommentModal"
import { fontAwesomeIconStyle } from "../../styles"
import { deleteComment } from "./postsSlice"
import { toast } from "react-toastify"

const Comment = ({comment, postId}) => {
    const {authToken,authUser} = useSelector((state) => state.authentication)
    const {users} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [userDetails,setuserDetails] = useState(null)

    useEffect(() => {
        setuserDetails(users.filter((currUser) => currUser.username === comment.username)[0])
    },[users])

    return (
        <>
            <Flex width='100%' padding='2.25' marginTop='1.25'>
                {
                    userDetails && (
                        <VStack width='100%'>
                            <Flex
                                flexWrap="wrap"
                                alignItems="center"
                                alignSelf="flex-start"
                                columnGap="1"
                                width="90%"
                            >
                                <Link to={`/profile/${userDetails.username}`}>
                                    <Flex>
                                        <Avatar
                                            src={
                                                userDetails.username === authUser.username
                                                ? authUser.avatarUrl
                                                : userDetails.avatarUrl 
                                            }
                                            alt="profile-picture"
                                            name={userDetails.firstName}
                                            display="block"
                                            size="md"
                                            marginRight="2"
                                        />
                                        <Flex flexDirection="column">
                                            <Flex columnGap="0.75rem">
                                                <Text fontWeight="bold">
                                                    {`${userDetails.firstName} ${userDetails.lastName}`}
                                                </Text>
                                            </Flex>
                                            <Text>
                                                @{userDetails.username}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Link>

                                {
                                    authUser.username === userDetails.username && (
                                        <Menu>
                                            <MenuButton
                                                position='absolute'
                                                background='transparent'
                                                right='7.5'
                                                color='blue.800'
                                                _hover={{background:'transparent'}}
                                            >
                                                <FontAwesomeIcon
                                                    icon='ellipsis-h'
                                                    {...fontAwesomeIconStyle}
                                                />
                                            </MenuButton>
                                            <MenuList minWidth='7.75rem'>
                                                <MenuGroup>
                                                    <CommentModal
                                                        comment={comment}
                                                        editCommentContent={true}
                                                        postId={postId}
                                                    />
                                                    <MenuDivider/>
                                                    <MenuItem
                                                        onClick={() => {
                                                            dispatch(deleteComment({
                                                                postId,commentId : comment._id,
                                                                authToken
                                                            }))
                                                            toast.success("Commment deleted.")
                                                        }}
                                                    >
                                                        Delete
                                                    </MenuItem>
                                                </MenuGroup>
                                            </MenuList>
                                        </Menu>
                                    )
                                }
                            </Flex>
                            <Text width="100%">{comment.text}</Text>
                        </VStack>
                    )
                }
            </Flex>
        </>
    )
}

export {Comment}