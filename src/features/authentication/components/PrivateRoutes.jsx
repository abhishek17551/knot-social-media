import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoutes = ({children}) => {
    const {authToken} = useSelector((state) => state.authentication)
    const location = useLocation()
    return (
        authToken ? (
            children
        ) : (
            <Navigate to='/login' state={{from:location}} replace/>
        )
    )
}

export {PrivateRoutes}