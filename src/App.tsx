import React, { useEffect, useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./landing/Home";
import About from "./landing/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Hospitals from "./hospital/Hospitals";
import { ErrorFallback } from "./components/Errorboundary/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { AuthContext } from "./context/AuthContext";
import HospitalDetails from "./hospital/HospitalDetails";
import HealthTips from "./pages/HealthTips";
// import PrivateRoute from "./utils/PrivateRoute";
import { auth, signOut, signInWithGoogle } from "./firebase";
import Navbar from "./navigation/Navbar";
import Doctors from "./pages/Doctors";
import Profile from "./pages/Profile";

function App() {
  
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [details, setDetails] = useState();
  let count = localStorage.getItem("page_views");
  if (count === null) {
    count = "1";
  } else {
    count = (parseInt(count) + 1).toString();
  }
  localStorage.setItem("page_views", count);

  // SET DETAILS
  const handleDetails = (details: any) => {
    setDetails(details);
  };

  // Google Signin
  const signIn = () => {
    signInWithGoogle();
  };

  // Google signup
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signUp = () => {
    signUp();
  };

  // Google Signout
  const signOutUser = () => {
    signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const client = auth.currentUser;
        setCurrentUser(client);
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Navbar signOut={signOutUser} user={currentUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin signIn={signIn} />} />
          <Route path="/signup" element={<Signup />} />;
          <Route
            path="/hospitals"
            element={
              currentUser ? (
                <Hospitals handleDetails={handleDetails} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/hospitaldetails"
            element={
              <HospitalDetails
                name={""}
                business_status={""}
                rating={""}
                details={details}
                vicinity={""}
                opening_hours={false}
              />
            }
          />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/healthtips" element={<HealthTips />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
