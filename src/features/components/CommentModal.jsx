import { Avatar, Button, Divider, Flex, HStack, IconButton, MenuItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addComment, editComment } from "./postsSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import { postCardStyle } from "../../styles"

const CommentModal = ({postId, comment, editCommentContent}) => {
    const {isOpen, onClose, onOpen} = useDisclosure()
    const dispatch = useDispatch()
    const {authUser, authToken} = useSelector((state) => state.authentication)
    const [content,setContent] = useState(editCommentContent ? comment.text : "")
    
    const onCommentClick = () => {
        if(!content)
            toast.error("Please add comments!")
        else {
            if(editCommentContent){
                dispatch(editComment({
                    postId,
                    commentId : comment._id,
                    commentData : content,
                    authToken
                }))
                toast.success("Comment updated succesfully!")
            } else {
                dispatch(addComment({
                    postId,
                    commentData : content,
                    authToken
                }))
                toast.success("Comment added successfully!");
            }
            onClose();
        }
    }

    return (
        <>
            {
                !editCommentContent && (
                    <IconButton
                    variant="iconButton"
                    onClick={onOpen}
                    icon={<FontAwesomeIcon icon={faComment}/>}
                    />
                )
            }
            {
                editCommentContent && (
                    <MenuItem 
                        _hover={{background:"gray.500"}}
                        onClick={onOpen}
                        background='inherit'
                        _hover={{background : 'blue.300'}}
                    >
                        Edit
                    </MenuItem>
                )
            }
            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
                size='md'
                margin='3'
                motionPreset="slideInRight"
            >
                <ModalOverlay/>
                <ModalContent width={{base:'90vw',md:'32.35rem'}}>
                    <ModalHeader paddingBottom='0'>
                        Post Reply
                    </ModalHeader>
                    <ModalCloseButton
                        background='transparent'
                        color={useColorModeValue('gray.600','white.800')}
                        _focus={{
                            boxShadow : 'none',
                            border : 'none'
                        }}
                    />
                    <ModalBody maxWidth='100%' paddingTop='0' paddingBottom='0'>
                        <Flex {...postCardStyle}>
                            <HStack alignItems='flex-start'>
                                <Avatar
                                    src={authUser.avatarUrl}
                                    name={authUser.firstName}
                                    marginTop='2.5'
                                    marginRight='3.5'
                                    size='md'
                                />
                                <Textarea
                                    value={content}
                                    placeholder="Comment your opinions..."
                                    onChange={(e) => setContent(e.target.value)}
                                    height="8rem"
                                    width="100%"
                                    focusBorderColor="transparent"
                                    outline='none'
                                    border='none'
                                    resize='none'
                                />
                            </HStack>
                            <Divider/>
                            <ModalFooter paddingBottom='0'>
                                <Button
                                    variant="solidPrimary"
                                    onClick={onCommentClick}
                                    height="70%"
                                    alignSelf="center"
                                    borderRadius='full'
                                    _hover={{
                                      bg: useColorModeValue("blue.800", "blue.200"),
                                    }}
                                >
                                    {editComment ? "Update" : "Comment"}
                                </Button>
                            </ModalFooter>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}

export {CommentModal}