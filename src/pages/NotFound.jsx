import {FaHome} from "react-icons/fa"
import { useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"

function NotFound() {

  const navigate = useNavigate()

  useEffect(() => navigate("/not-found"), [navigate])

  return (
    <div>
        <h1 className="centered"> Ooops!</h1>
        <p className="centered"> 404 - Page not found! </p> 
        <Link to="/" className="NotFoundPageButton">
          <FaHome />
          Back Home
        </Link>     
    </div> 
  )
}

export default NotFound
