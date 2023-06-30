import { Avatar, Button, Flex } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { followUser } from "../../services/followService"

const UserCard = ({user, followButton, onClose, gap}) => {
    const dispatch = useDispatch()
    const {authToken} = useSelector((state) => state.authentication)

    return (
        <>
            <Flex>
                <Link to={`/profile/${user.username}`} onClick={onClose}>
                    <Avatar
                        src={user.avatarUrl}
                        alt='profile-picture'
                        name={user.firstName}
                    />
                </Link>
                <Flex>
                    <Link to={`/profile/${user.username}`} onClick={onClose}>
                        <Flex>
                            <Text>
                                {`${user.firstName} ${user.lastName}`}
                            </Text>
                            <Text>
                                @{user.username}
                            </Text>
                        </Flex>
                    </Link>
                    {
                        followButton && (
                            <Button
                                onClick={() => dispatch(followUser({followUserId : user._id, authToken, dispatch}))}
                            >
                                Follow +
                            </Button>
                        )
                    }
                </Flex>
            </Flex>
        </>
    )
}

export {UserCard}