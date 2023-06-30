import { Button, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { UserCard } from "./UserCard";

const Suggestions = () => {
    const {authUser} = useSelector((state) => state.authentication)
    const {users} = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const location = useLocation();
    const {postSorting} = useSelector((state) => state.posts)
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        setSuggestions(
            users.filter((user) => !authUser.following.find(
                (currUser) => currUser._id === user._id
            ) && user.username !== authUser.username)
        )
    },[authUser, users])

    return (
        <Flex>
            {
                location.pathname === '/' && (
                    <Flex>
                        <Button>
                            <FontAwesomeIcon icon='fire' style={{ paddingRight: "5px" }}/>
                            Trending around you!
                        </Button>
                        <Button>
                            <FontAwesomeIcon icon="sort" style={{ paddingRight: "5px" }}/>
                            Latest
                        </Button>
                    </Flex>
                )
            }
            <Text>
                Suggestions for you!
            </Text>
            {
                suggestions.slice(0,4).map((user) => user.username !=== authUser.username && (
                    <UserCard key={user._id} user={user}  followButton={true}/>
                ))
            }
        </Flex>
    )

}