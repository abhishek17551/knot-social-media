import { Link } from "react-router-dom";
import { Avatar,Input,Image,Heading,HStack,useColorMode,useColorModeValue,Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fontAwesomeIconStyle } from "../styles";
import { useSelector } from "react-redux";

const Navigation = () => {
    return (
        <Flex>
            <Flex>
                <Link to='/'>
                    <Image src={useColorModeValue()}
                    alt="knot-logo"
                    objectFit='cover'
                    marginLeft='3'/>
                </Link>

                <Link to='/'> 
                    <Heading padding='1.5' display={{base:'none', md:'block' }}>Knot Media</Heading>
                </Link>
            </Flex>
            <Flex>
                {/* SearchBar here*/}
            </Flex>
            <HStack>
                <FontAwesomeIcon />
                <Link to='/'>
                <Avatar
                alt="profile-image"
                src={} 
                display={{base: "none", md: "block"}}
                size="sm"
                marginRight="8"/>
                </Link>
            </HStack>
        </Flex>
    )
}

export {Navigation}