import { Flex } from "@chakra-ui/react"
import { Navigation } from "../../../components/Navigation"
import { ProfileCard } from "./ProfileCard"

const Profile = () => {
    return (
        <>
            <Navigation/>
            <Flex>
                {/* Sidebar here */}
                <Flex>
                    <ProfileCard/>
                </Flex>
                {/* Suggestions here */}
            </Flex>
            {/* Footer here */}
        </>
    )
}

export {Profile}