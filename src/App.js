import './App.css';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from './features/components/postsSlice';
import { getUsers } from './features/components/usersSlice';
import { ScrollTop } from './components/ScrollTop';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './features/authentication/components/PrivateRoutes';
import { Profile } from './features/profile/components/Profile';
import { Bookmark } from './features/bookmarks/Bookmark';
import PostsLiked from './features/postsLiked/postsLiked';
import { Explore } from './features/explore/Explore';
import { SinglePostPage } from './features/components/SinglePostPage';
import { LoginForm } from './features/authentication/components/LoginForm';
import { SignupForm } from './features/authentication/components/SignUpForm';
import { NotFound } from './components/NotFound';

function App() {
  const color = useColorModeValue('gray.700','whiteAlpha.800')
  const bg = useColorModeValue("whiteAlpha.700", "gray.900")
  const {authToken} = useSelector((state) => state.authentication)
  const {postStatus} = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getUsers())
  },[authToken])
  return (
    <>
      <Box>
        {
          postStatus === "pending" ? (
            <Loader/>  //add loader here
          ) : (
            <Flex>
              <ScrollTop/>
              <ToastContainer
                theme={useColorModeValue('light','dark')}
                position='bottom-right'
                autoClose={900}
                draggable
              />
              <Routes>
                <Route
                  path='/profile/:username'
                  element={
                    <PrivateRoutes>
                        <Profile/>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/bookmarks'
                  element={
                    <PrivateRoutes>
                      <Bookmark/>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/liked'
                  element={
                    <PrivateRoutes>
                      <PostsLiked/>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/explore'
                  element={
                    <PrivateRoutes>
                      <Explore/>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/post/:postId'
                  element={
                    <PrivateRoutes>
                      <SinglePostPage/>
                    </PrivateRoutes>
                  }
                />
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/signup' element={<SignupForm/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
            </Flex>
          )
        }
      </Box>
    </>
  );
}

export default App;
