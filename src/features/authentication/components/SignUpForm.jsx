import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { useSignupHandler } from "./hooks/useSignupHandler";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, useColorModeValue } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignupForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {authToken} = useSelector((state) => state.authentication)
    const [show,setShow] = useState(false)
    const {signUpHandler,formData, errorData, formDispatch, errorDispatch } = useSignupHandler()

    const handleClick = () => setShow(false)

    useEffect(() => {
        authToken &&
          navigate(location?.state?.from?.pathname || "/", { replace: true });
      }, [authToken]);

    return (
        <Flex>
            <Flex>
                <Heading>Knot media</Heading>
                <Heading>Sign Up!</Heading>
                <form onSubmit={(e) => signUpHandler(e)} noValidate>
                    <FormControl 
                        id='first-name'
                        width='100%'
                        isRequired
                        isInvalid={errorData.firstName.length > 0}
                        marginY='1.5'
                    >
                        <FormLabel>First Name :</FormLabel>
                        <Flex>
                            <Input
                            value={formData.firstName}
                            onChange={(e) => formDispatch({
                                type : 'INPUT_FIRST_NAME',
                                payload : e.target.value
                            })}
                            placeholder="Enter First Name"
                            _focus={{borderColor : useColorModeValue('blue.800', 'blue.400')}}
                            onFocus={() => {
                                errorDispatch({
                                    type: "ERROR_FIRST_NAME",
                                    payload: "",
                                })
                            }}
                            />
                            <FormErrorMessage>{errorData.firstName}</FormErrorMessage>
                        </Flex>
                    </FormControl>

                    <FormControl
                        id='last-name'
                        width='100%'
                        marginY='1.5'
                        isRequired
                        isInvalid={errorData.lastName.length > 0}
                    >
                        <FormLabel>Last Name :</FormLabel>
                        <Flex>
                            <Input
                                value={formData.lastName}
                                onChange={(e) => formDispatch({
                                    type : 'INPUT_LAST_NAME',
                                    payload : e.target.value
                                })}
                                placeholder="Enter Last Name"
                                onFocus={() => errorDispatch({
                                    type: "ERROR_LAST_NAME",
                                    payload: "",
                                })}
                                _focus={{
                                    borderColor: useColorModeValue("blue.800", "blue.400"),
                                }}
                            />
                            <FormErrorMessage>{errorData.lastName}</FormErrorMessage>
                        </Flex>
                    </FormControl>

                    <FormControl
                        id='user-name'
                        width='100%'
                        marginY='1.5'
                        isRequired
                        isInvalid={errorData.username.length > 0}
                    >
                        <FormLabel>Username :</FormLabel>
                        <Flex>
                            <Input
                                value={formData.username}
                                onChange={(e) =>
                                    formDispatch({
                                      type: "INPUT_USERNAME",
                                      payload: e.target.value,
                                    })
                                }
                                placeholder="Enter Username"
                                onFocus={() =>
                                    errorDispatch({
                                      type: "ERROR_USERNAME",
                                      payload: "",
                                    })
                                }
                                _focus={{
                                    borderColor: useColorModeValue("blue.800", "blue.400"),
                                }}
                            />
                            <FormErrorMessage>{errorData.username}</FormErrorMessage>
                        </Flex>
                    </FormControl>

                    <FormControl
                        id='email-address'
                        width='100%'
                        marginY='1.5'
                        isRequired
                        isInvalid={errorData.email.length > 0}
                    >
                        <FormLabel>Email Address : </FormLabel>
                        <Flex>
                            <Input
                                value={formData.email}
                                type="email"
                                placeholder="Enter Email"
                                onChange={(e) =>
                                    formDispatch({ 
                                        type: "INPUT_EMAIL", payload: e.target.value 
                                    })
                                }
                                onFocus={() =>
                                    errorDispatch({
                                      type: "ERROR_EMAIL",
                                      payload: "",
                                    })
                                }
                                _focus={{
                                    borderColor: useColorModeValue("blue.800", "blue.400"),
                                }}
                            />
                            <FormErrorMessage>{errorData.email}</FormErrorMessage>
                        </Flex>
                    </FormControl>

                    <FormControl
                        id='password'
                        width='100%'
                        marginY='1.5'
                        isRequired
                        isInvalid= {errorData.password.length > 0}    
                    >
                        <FormLabel>Password :</FormLabel>
                        <Flex>
                            <InputGroup>
                            <Input
                               value={formData.password}
                               type={show ? "text" : "password"}
                               placeholder="Enter password"
                               onChange={(e) =>
                                formDispatch({
                                  type: "INPUT_PASSWORD",
                                  payload: e.target.value,
                                })
                                }
                                onFocus={() =>
                                    errorDispatch({
                                      type: "ERROR_PASSWORD",
                                      payload: "",
                                    })
                                }
                                _focus={{
                                    borderColor: useColorModeValue("blue.800", "blue.400"),
                                }}

                            />
                            <InputRightElement width='5rem'>
                                <IconButton variant='iconButton' onClick={handleClick} size='sm'>
                                    <FontAwesomeIcon icon={show ? 'eye' : 'eye-slash'} />
                                </IconButton>
                            </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errorData.password}</FormErrorMessage>
                        </Flex>
                    </FormControl>

                    <Button variant='solidPrimary' type="submit" width='100%' marginY='2.5'>
                            Sign Up
                    </Button>
                </form>
                <Flex>
                    <span>Already have an account?</span>
                    <Button
                        variant='link'
                        display='inline'
                        fontSize='1.25rem'
                        textDecoration='underline'
                        marginLeft='3'
                        onClick={() => navigate("/login", { state: location.state, replace: true })}
                    >Login In</Button>
                </Flex>
            </Flex>
        </Flex>
    )

}

export {SignupForm}