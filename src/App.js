import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./componets/Navbar"
import Explore from "./pages/Explore"
import Offers from "./pages/Offers"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"
import NotFound from "./pages/NotFound"
import PrivateRoute from "./componets/PrivateRoute"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer  />
    </>
  );
}

export default App;
