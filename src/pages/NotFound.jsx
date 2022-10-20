import {FaHome} from "react-icons/fa"
import {Link} from "react-router-dom"

function NotFound() {
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
