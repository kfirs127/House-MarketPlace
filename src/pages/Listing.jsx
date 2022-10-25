import {useState, useEffect} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import {getDoc, doc} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {db} from "../firebase.config"
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import Spinner from "../components/Spinner"
import shareIcon from "../assets/svg/shareIcon.svg"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';

function Listing() {

    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
          const docRef = doc(db, 'listings', params.listingId)
          const docSnap = await getDoc(docRef)
    
          if (docSnap.exists()) {
            setListing(docSnap.data())
            setLoading(false)
          }
        }
        fetchListing()
    }, [navigate, params.listingId])


    const onClick = () => {
        navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
    }

    if(loading){
        return <Spinner />
    }

    return (
        <main>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                style={{ height: '300px' }}
            >
                {listing.imgUrls.map((url, index) => {
                return (
                        <SwiperSlide key={index}>
                            <div
                                className='swiperSlideDiv'
                                style={{
                                    background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                    backgroundSize: 'cover',
                                }}
                            >
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className="shareIconDiv" onClick={onClick} >
                <img src={shareIcon} alt="" />
            </div>
            {shareLinkCopied && 
                 <p className="linkCopied"> Link Copied ! </p>
                }
            <div className="listingDetails">
                    <p className="listingName">
                        {listing.name} - {" "}
                        {listing.offer ?
                               listing.discountedPrice
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g,',') 
                                :
                                listing.regularPrice
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g,',') 
                        }$
                    </p>
                    <p className="listingLocation"> {listing.location} </p>
                    <p className="listingType"> 
                        {listing.type === "rent" ? "Rent" : "Sale"}
                    </p>
                    {listing.offer && (
                        <p className="discountPrice">
                            {listing.regularPrice - listing.discountedPrice}$ discount
                        </p>
                    )}
                    <ul className="listingDetailsList">
                        <li>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} bedrooms` : "1 bedroom"}
                        </li>
                        <li>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : "1 bathroom"}
                        </li>
                        <li>
                            {listing.parking && "Parking spot"}
                        </li>
                        <li>
                            {listing.furnished && "Furnished"}
                        </li>
                    </ul>
                    <p className="listingLocationTitle">
                        Location
                    </p>
                    <div className="leafletContainer">
                        <MapContainer 
                            style={{height: "100%", width: "100%"}} 
                            center={[listing.latitude, listing.longitude]}
                            zoom={13}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                            />
                            <Marker position={[listing.latitude, listing.longitude]}>
                                <Popup> {listing.location} </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    {/* supppose to be userRef, but it's useRed due to typo */}
                    {auth.currentUser?.uid !== listing.useRef && (
                        <Link
                            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
                            className='primaryButton'
                        >
                            Contact Landlord
                        </Link>
                    )}
                </div>
        </main>
    )
}

export default Listing
