import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./profile.css";
import HospitalCard from "../hospital/HospitalCard";

const Profile = (details: any) => {
  const [user, setUser] = useState<any>(null);
  const [savedHospitals, setSavedHospitals] = useState<any[]>([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        // Retrieve saved hospital details from local storage
        const storedHospitalDetails = localStorage.getItem(
          "savedHospitalDetails"
        );
        if (storedHospitalDetails) {
          const parsedHospitalDetails = JSON.parse(storedHospitalDetails);
          setSavedHospitals(parsedHospitalDetails);
        } else {
          setSavedHospitals([]);
        }
      } else {
        setUser(null);
        setSavedHospitals([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleProfilePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <h2>User Details</h2>
        {user ? (
          <>
            <div className="profile-picture-container">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="profile"
                  className="profile-picture"
                />
              ) : user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="profile-picture"
                />
              ) : (
                <div className="default-profile-picture"></div>
              )}
              {/* <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              /> */}
            </div>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <div className="saved-hospitals">
        <h2>Saved Hospitals</h2>
        {user ? (
          savedHospitals.length > 0 ? (
            savedHospitals.map((hospital, index) => (
              <HospitalCard
                key={index}
                name={hospital.name}
                status={hospital.business_status}
                rating={hospital.rating}
                details={hospital}
                formatted_address={hospital.vicinity}
                handleDetails={details}
              />
            ))
          ) : (
            <p>No hospitals saved</p>
          )
        ) : (
          <p>Please sign in to view saved hospitals</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

// import { useEffect, useState } from "react";
// import { auth } from "../firebase" // Assuming you have a configured Firebase instance

// import "./profile.css";
// import HospitalDetails from "../hospital/HospitalDetails";

// const Profile = () => {
//   const [user, setUser] = useState<any>(null); // State to store the user's information
//   const [savedHospitals, setSavedHospitals] = useState<any[]>([]); // State to store the saved hospitals

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in
//         setUser(user);

//         // Simulated data for saved hospitals
//         const savedHospitalsData = [
//           {
//             name: "Hospital 1",
//             business_status: "Open",
//             rating: "4.5",
//             details: "Hospital details 1",
//             vicinity: "Hospital vicinity 1",
//             opening_hours: true,
//           },
//           {
//             name: "Hospital 2",
//             business_status: "Closed",
//             rating: "3.8",
//             details: "Hospital details 2",
//             vicinity: "Hospital vicinity 2",
//             opening_hours: false,
//           },
//           // Add more saved hospitals as needed
//         ];

//         setSavedHospitals(savedHospitalsData);
//       } else {
//         // User is signed out
//         setUser(null);
//         setSavedHospitals([]);
//       }
//     });

//     return () => {
//       // Clean up the listener
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <div className="profile-page-container">
//       <h1>Profile</h1>
//       <div className="profile-details">
//         <h2>User Details</h2>
//         {user ? (
//           <>
//             <p>Name: {user.displayName}</p>
//             <p>Email: {user.email}</p>
//           </>
//         ) : (
//           <p>Loading user data...</p>
//         )}
//       </div>
//       <div className="saved-hospitals">
//         <h2>Saved Hospitals</h2>

//         {/* Logic for displaying saved hospitals */}
//         {user ? (
//           savedHospitals.length > 0 ? (
//             savedHospitals.map((hospital, index) => (
//               <HospitalDetails
//                 key={index}
//                 name={hospital.name}
//                 business_status={hospital.business_status}
//                 rating={hospital.rating}
//                 details={hospital.details}
//                 vicinity={hospital.vicinity}
//                 opening_hours={hospital.opening_hours}
//               />
//             ))
//           ) : (
//             <p>No hospitals saved</p>
//           )
//         ) : (
//           <p>Please sign in to view saved hospitals</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
