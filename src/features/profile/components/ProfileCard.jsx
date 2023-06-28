import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  useParams } from "react-router-dom"
import { loadUserDetails, loadUserPosts } from "../profileSlice"
import { followUser, unfollowUser } from "../../../services/followService"
import { Avatar, Box, Button, Divider, Flex, Heading, IconButton, Link, Tooltip } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { DisplayPost } from "../../components/DisplayPost"
import { postCardStyle } from "../../../styles"

const ProfileCard = () => {
    const {username} = useParams()
    const {posts} = useSelector((state) => state.posts)
    const {postsDetails}= useSelector((state) => state.profile)
    const {authUser,authToken} = useSelector((state) => state.authentication)
    const {profileDetails} = useSelector((state) => state.profile)
    const {followStatus} = useSelector9((state) => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        if(username) {
            dispatch(loadUserDetails(username))
            dispatch(loadUserPosts(username))
        }
    },[authUser,username,posts])

    const isFollowed = () => {
        profileDetails.follwers.some((currUser) => currUser.username === authUser.username)
    }

    const followUnfollowHandler = () => {
        isFollowed() ? 
            dispatch(unfollowUser({
                followuserId : profileDetails._id,
                authToken,
                dispatch
            })) : dispatch(
                followUser({
                    followuserId : profileDetails._id,
                    authToken,
                    dispatch
                })
            )
    }

    return (
        <>
            {
                profileDetails?.username !== authUser.username ? (
                    <Loader/>
                ) : (
                   <>
                    <Flex
                        {...postCardStyle}
                        boxShadow="none"
                        width={{ base: "90vw", md: "85%", lg: "32.25rem" }}
                    >
                        <Flex  marginTop="1.25" width="100%" padding="2.25">
                            <Avatar
                                src={profileDetails?.avatarUrl}
                                size="lg"
                                name={profileDetails.firstName}
                            />
                            <Flex flexDirection="column" width="100%" margin="2.25"  rowGap="1">
                                <Flex flexWrap="wrap" justifyContent="space-between" >
                                    <Flex flexDirection="column">
                                        <Text>{`${profileDetails.firstName} ${profileDetails.lastName}`}</Text>
                                        <Text>{`@${profileDetails.username}`}</Text>
                                    </Flex>
                                    {
                                        authUser.username === profileDetails.username && (
                                            <Flex alignItems="center">
                                                {/* UpdateProfileForm here */}
                                                <Tooltip>
                                                    <IconButton
                                                        variant="iconButton"
                                                        icon={<FontAwesomeIcon icon="sign-out" />}
                                                        onClick={() => dispatch(logoutUser())}
                                                    />
                                                </Tooltip>
                                                </Flex>
                                        )
                                    }

                                    {
                                        authUser.username !== profileDetails.username && (
                                            <Button
                                                variant="outline"
                                                onClick={followUnfollowHandler}
                                                disabled={followStatus === "pending"}
                                                height='2.25rem'
                                            >
                                                {isFollowed ? 'Following' : 'Follow'}
                                            </Button>
                                        )
                                    }
                                </Flex>
                                {
                                    profileDetails.bio && 
                                    <Text>{profileDetails.bio}</Text>
                                }
                                <Flex flexWrap="wrap" justifyContent="space-between">
                                    {
                                        profileDetails.website && (
                                            <Link
                                                href={profile.website}
                                                isExternal
                                                target="_blank"
                                            >
                                                {profileDetails.website}
                                            </Link>
                                        )
                                    }
                                    <Box>
                                        <FontAwesomeIcon 
                                            icon='calendar'
                                            color="#9097DD"
                                        />
                                        <span>
                                            {`${new Date(profileDetails.createdAt)
                                            .toDateString('en-US', {
                                                year : 'numeric',
                                                month : 'long',
                                                day : 'numeric'
                                            }).slice(4)}`}
                                        </span>
                                    </Box>
                                </Flex>
                                <Flex flexWrap="wrap" justifyContent="space-between">
                                    <Button variant="link">{postsDetails.length} posts</Button>
                                    {/* Following modal here */}
                                </Flex>
                            </Flex>
                        </Flex>
                        <Divider/>
                    </Flex>
                    <Flex
                        justifyContent='center'
                        alignItems='center'
                        flexDirection='column'
                        width='100%'
                    >
                        {
                            postsDetails.length > 0 ? (
                                postsDetails.map((post) => (
                                    <DisplayPost key={post._id} post={post}/>
                                ))
                            ) : (
                                <Heading textAlign="center" paddingTop='3.5'>
                                    No Posts Yet!
                                </Heading>
                            )
                        }
                    </Flex>
                   </> 
                )
            }
        </>
    )
}

export {ProfileCard}