import { Avatar, Button, Flex } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { followUser } from "../../services/followService"

const UserCard = ({user, followButton, onClose, gap}) => {
    const dispatch = useDispatch()
    const {authToken} = useSelector((state) => state.authentication)

    return (
        <>
            <Flex
                justifyContent='flex-start'
                alignItems='center'
                columnGap={gap ? gap : '2.75px'}
                height='fit-content'
                marginTop='3.5'
                paddingBottom='1.5'
            >
                <Link to={`/profile/${user.username}`} onClick={onClose}>
                    <Avatar
                        src={user.avatarUrl}
                        alt='profile-picture'
                        name={user.firstName}
                        size='sm'
                        marginRight='2'
                    />
                </Link>
                <Flex wrap='wrap'>
                    <Link to={`/profile/${user.username}`} onClick={onClose}>
                        <Flex flexDirection="column" flexGrow="1" width="100%">
                            <Text width={{base:"fit-content", md: "11ch" }}>
                                {`${user.firstName} ${user.lastName}`}
                            </Text>
                            <Text marginTop="0" fontSize="sm">
                                @{user.username}
                            </Text>
                        </Flex>
                    </Link>
                    {
                        followButton && (
                            <Button
                                variant="solidPrimary"
                                onClick={() => dispatch(followUser({followUserId : user._id, authToken, dispatch}))}
                                width="4.25rem"
                                height="2rem"
                                borderRadius="full"
                                fontSize="sm"
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