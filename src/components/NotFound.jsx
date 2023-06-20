import { Button, Flex, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <Flex>
            {/* Image here */}
            <Heading>Oops! Sorry,we could not find anything here...</Heading>
            <Flex alignItems="center">
                <Button
                    variant="solidPrimary"
                    onClick={() => navigate("/", { replace: true })}
                >
                    Home
                </Button>
            </Flex>
        </Flex>
    )
}

export { NotFound }