import {Navigate, Outlet} from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus"
import Sppiner from "./Sppiner"

const PrivateRoute = () => {

    const {loggedIn, checkingStatus} = useAuthStatus()

    if(checkingStatus){
        return <Sppiner />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute
