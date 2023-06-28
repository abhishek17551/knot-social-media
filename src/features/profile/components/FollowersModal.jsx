import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const FollowersModal = ({followersList}) => {
    const {isOpen, onClose, onOpen} = useDisclosure()

    return (
        <>
            <Button variant="link" onClick={onOpen}>
                {followersList.length} followers
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size='sm' margin='2.25'>
                <ModalOverlay/>
                <ModalContent width='90%'>
                    <ModalHeader>Followers</ModalHeader>
                    <ModalCloseButton
                        background='transparent'
                        color={useColorModeValue('gray.800', 'whiteAlpha.800')}
                        _focus={{
                            boxShadow:'none',
                            border:'none'
                        }}
                    />
                    <ModalBody justifyContent="space-between" paddingBottom='1.75rem'>
                    {
                            followersList.length > 0 ? (
                                followersList.map((user) => (
                                    // usercard here
                                ))
                            ) : (
                                <Text textAlign="center">No Followers Yet!</Text>
                            )
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export {FollowersModal}