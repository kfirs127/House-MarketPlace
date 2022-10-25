import {Link} from "react-router-dom"
import {ReactComponent as DeleteIcon} from "../assets/svg/deleteIcon.svg"
import bedIcon from "../assets/svg/bedIcon.svg"
import bathtubIcon from "../assets/svg/bathtubIcon.svg"


function ListingItem({listing, id, onDelete}) {
  return (
    <li className="categoryListing">
        <Link 
            to={`/category/${listing.type}/${id}`}
            className="categoryListingLink">
                <img
                    src={listing.imgUrls[0]}
                    alt={listing.name}
                    className="categoryListingImg"
                />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation"> {listing.location} </p>
                    <p className="categoryListingName"> {listing.name} </p>
                    <p className="categoryListingPrice">
                        {listing.offer ? 
                            listing.discountedPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g,",")
                            : 
                            listing.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g,",")
                        }$
                        {listing.type === "rent" && " per Month"}
                    </p>
                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt="bed" />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1 ? 
                                `${listing.bedrooms} Bedrooms` : 
                                "1 Bedrooms"
                            }
                        </p>
                        <img src={bathtubIcon} alt="bathtub" />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1 ? 
                                `${listing.bedrooms} Bathtubs` : 
                                "1 Bathtub"
                            }
                        </p>
                    </div>
                </div>
        </Link>
        {onDelete && (
            <DeleteIcon
                className="removeIcon" 
                fill="rgb(231, 76, 60)"
                onClick={onDelete(listing.id, listing.nam)}
            />
        )}  
    </li>
  )
}

export default ListingItem
