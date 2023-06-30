import { Box, FormControl, Input, InputRightElement, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

const SearchBar = (props) => {
    const timerId = useRef()
    const inputSearchRef = useRef(null)
    const [searchUser,setSearchUser] = useState("")
    const [searchResult,setSearchResult] = useState([])
    const {onOpen, onClose, isOpen} = useDisclosure()
    const {users} = useSelector((state) => state.users)

    const searchCondition = (user) => 
            user.firstName.toLowerCase().includes(searchUser.toLocaleLowerCase()) ||
            user.lastName.toLowerCase().includes(searchUser.toLocaleLowerCase()) ||
            user.username.toLowerCase().includes(searchUser.toLocaleLowerCase());

    const closeSearch = () => {
        onClose();
        setSearchUser("")
    }
    useEffect(() => {
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
            if(searchUser)
                setSearchResult(users?.filter(searchCondition))
            else
                setSearchResult([]);
        },500)
        return () => clearTimeout(timerId.current)
    }, [searchUser])

    return (
        <Popover
            flip={true}
            isOpen={isOpen}
            initialFocusRef={inputSearchRef}
            placement="bottom"
        >
            <PopoverTrigger>
                <FormControl>
                    <Input
                        value={searchUser}
                        ref={inputSearchRef}
                        placeholder="Search User..."
                        onChange={(e) => setSearchUser(e.target.value)}
                        onClick={onOpen}
                    />
                    <InputRightElement>
                        {
                            isOpen ? (
                                <FontAwesomeIcon
                                    icon='close'
                                    onClick={closeSearch}
                                    
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon='magnifying-glass'
                                    onClick={onOpen}
                                />
                            )
                        }
                    </InputRightElement>
                </FormControl>
            </PopoverTrigger>

            <PopoverContent>
                <PopoverBody>
                    {
                        searchResult.length === 0 ? (
                            <Text>
                                {
                                    searchUser ? "No User found with the entered details." : "Search User."
                                }
                            </Text>
                        ) : (
                            searchResult.map((user) => (
                                <Box key={user._id} onClick={closeSearch}>
                                    {/* Usercard here */}
                                </Box>
                            ))
                        )
                    }
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export {SearchBar}