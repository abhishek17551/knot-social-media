import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react"

const Loader = () => {
    return (
        <Flex>
            <Spinner 
            color={useColorModeValue('blue.800','blue.200')}
            size='xl'
            speed="1s"
            thickness="5px"
            />
        </Flex>
    )
}

export { Loader }