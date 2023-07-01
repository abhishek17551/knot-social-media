import { Flex } from "@chakra-ui/react"
import { Navigation } from "../../../components/Navigation"
import { ProfileCard } from "./ProfileCard"
import { flexMiddleContainerStyle, flexMiddleOuterContainerStyle } from "../../../styles"

const Profile = () => {
    return (
        <>
            <Navigation/>
            <Flex {...flexMiddleOuterContainerStyle}>
                {/* Sidebar here */}
                <Flex {...flexMiddleContainerStyle}>
                    <ProfileCard/>
                </Flex >
                {/* Suggestions here */}
            </Flex>
            {/* Footer here */}
        </>
    )
}

export {Profile}