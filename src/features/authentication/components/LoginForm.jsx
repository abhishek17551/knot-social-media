import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { loginUser } from "../authenticationSlice"
import { toast } from "react-toastify"
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputAddon, InputGroup, InputRightElement } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LoginForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const {authToken} = useSelector((state) => state.authentication)

    const [show,setShow] = useState(false)
    const [loginData,setLoginData] = useState({username : "", password : ""})
    const [errorData,setErrorData] = useState(false)

    const handleClick = () => setShow(!show)

    useEffect(() => {
        authToken && navigate(location?.state?.from?.pathname || "/", { replace: true });
    }, [authToken])

    const loginHandler = (e) => {
        e.preventDefault();
        if(e && e.target.innerText === 'Login As Guest') {
            setLoginData({
                username : 'abhishek17',
                password : 'abhishek1998'
            })
            dispatch(
                loginUser({
                    username : 'abhishek17',
                    password : 'abhishek1998' 
                })
            )
        } else {
            if(loginData.username.trim() === "" || loginData.password.trim() === "")
                toast.error("Incorrect Username or Password")
            else dispatch(loginUser({
                username : loginData.username,
                password : loginData.password
            }))
        }
    }

    return (
        <Flex>
            <Flex>
                <Image/>
            </Flex>

            <Flex>
                <Flex>
                    <Heading>Knot Media</Heading>
                    <form onSubmit={loginHandler} noValidate>
                        <FormControl
                            id="user-name"
                            isRequired
                            isInvalid={false}
                            width='100%'
                            marginY='2.5'    
                        >
                            <FormLabel>Username :</FormLabel>
                            <Input
                                value={loginData.username}
                                placeholder="Enter Username..."
                                onChange={(e) => setLoginData({...loginData, username:e.target.value})}
                                onFocus={() => setErrorData(false)}
                                _focus={{
                                    borderColor: useColorModeValue("blue.800", "blue.400"),
                                }}
                            />
                            <FormErrorMessage>Please enter Username...</FormErrorMessage>
                        </FormControl>

                        <FormControl
                            id="password"
                            isRequired
                            isInvalid={false}
                            width='100%'
                            marginY='2.5'
                        >
                            <FormLabel>Password : </FormLabel>
                            <InputGroup>
                                <Input
                                    value={loginData.password}
                                    placeholder="Enter Password..."
                                    type={show ? 'text' : 'password'}
                                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                    onFocus={() => setErrorData(false)}
                                    _focus={{
                                        borderColor: useColorModeValue("blue.800", "blue.400"),
                                    }}
                                />
                                <InputRightElement>
                                    <IconButton
                                        onClick={handleClick}   
                                        variant='iconButton' 
                                    >
                                        <FontAwesomeIcon 
                                            icon={show ? 'eye' : 'eye-slash'}
                                        />
                                    </IconButton>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>Please enter Password...</FormErrorMessage>
                        </FormControl>
                        <Button variant='solidPrimary' type="submit">
                            Login
                        </Button>
                        <Button variant='outline' onClick={(e) => loginHandler(e,setLoginData,setErrorData,null)}>
                                Login As Guest
                        </Button>
                    </form>
                    {
                        errorData && (
                            <Box>
                                <FontAwesomeIcon icon='circle-exclamation'/>
                                <span>Entered Email or Password is incorrect.</span>
                            </Box>
                        )
                    }
                    <Flex>
                        <span>Do not have an account?</span>
                        <Button variant='link' onClick={() => navigate("/signup", {state:location.state, replace=true})}>Sign Up Here!</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )

}

exprt {LoginForm}