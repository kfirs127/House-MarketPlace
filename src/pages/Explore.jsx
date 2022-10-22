import {Link} from "react-router-dom"
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg"
import saleCategoryImage from "../assets/jpg/sellCategoryImage.jpg"

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader"> Explore </p>
        {/* Slider */}
        <p className="exploreCategoryHeading"> Categories </p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage} 
              alt="rent" 
              className="exploreCategoryImg" 
            />
            <p className="exploreCategoryName"> Place for rent </p>
          </Link>
          <Link to="/category/sale">
            <img
              src={saleCategoryImage} 
              alt="sale" 
              className="exploreCategoryImg" 
            />
            <p className="exploreCategoryName"> Place for sale </p>
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Explore
