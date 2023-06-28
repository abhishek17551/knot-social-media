import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure } from "@chakra-ui/react"

const FollowingModal = ({followingList}) => {
    const {isOpen, onClose, onOpen} = useDisclosure()

    return (
        <>
            <Button variant="link" onClick={onOpen}>
                {followingList.length} following
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size='sm' margin='2.25' >
                <ModalOverlay/>
                <ModalContent width='90%'>
                    <ModalHeader>Following</ModalHeader>
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
                            followingList.length > 0 ? (
                                followingList.map((user) => (
                                    // usercard here
                                ))
                            ) : (
                                <Text textAlign="center">No Following Yet!</Text>
                            )
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export {FollowingModal}