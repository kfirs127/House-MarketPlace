import {useLocation, useNavigate} from "react-router-dom"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {doc, setDoc, getDoc ,serverTimestamp} from "firebase/firestore"
import {db} from "../firebase.config"
import {toast} from "react-toastify"
import googleIcon from "../assets/svg/googleIcon.svg"


function OAuth() {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () =>{ 
        try{
            //get the user with google auth
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            ///check for user
            const decRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(decRef)

            //if user doesn"t exists, create user
            if(!docSnap.exists()){
                await setDoc(doc(db, "users", user.uid), {name: user.displayName, 
                                                          email: user.email, 
                                                          timestamp: serverTimestamp()})
            }
            navigate("/")
        }catch(error){
            toast.error("Could not autherize with google")
        }
    }

    return (
        <div className="socialLogin">
            <p> Sign {location.pathname === "/sign-up" ? "up" : "in"} with </p>
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img className="socialIconImg" src={googleIcon} alt="google"/>
            </button>
        </div>
    )
}

export default OAuth
