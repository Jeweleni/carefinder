import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import "./hospitaldetails.css";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

type Props = {
  placeId: string;
  name: string;
  business_status: any;
  rating: string;
  details: any;
  vicinity: string;
  opening_hours: boolean;
};

const HospitalDetails: React.FC<Props> = ({
  placeId,
  // name,
  // business_status,
  // vicinity,
  // rating,
  details,
  // opening_hours,
}: Props) => {
  // const hospitalData = [
  //   {
  //     placeId: placeId,
  //     name: name,
  //     business_status: business_status,
  //     rating: rating,
  //     vicinity: vicinity,
  //     opening_hours: opening_hours,
  //   },
  // ];

  const [loading, setLoading] = useState(true);
  const [hospitalDetails, setHospitalDetails] = useState<any>(null);
  const navigate = useNavigate();

  // SHARE DATA VIA WHATSAPP
  const handleShare = () => {
    const hospitalData = `${details?.name}\n${details?.business_status}\n${details?.rating}\n${details?.vicinity}\n${details?.opening_hours}`;
    const url = `https://wa.me/?text=${encodeURIComponent(hospitalData)}`;
    window.open(url, "_blank");
  };

  // SHARE HOSPITAL DATA VIA EMAIL
  const handleShareEmail = () => {
    const shareData = `${details?.name}\n${details?.business_status}\n${details?.rating}\n${details?.vicinity}\n${details?.opening_hours}`;
    const url = `mailto:?subject=${encodeURIComponent(
      "Check out this hospital"
    )}&body=${encodeURIComponent(shareData)}`;
    window.open(url, "_blank");
  };

  // SHARE HOSPITAL DATA VIA LINK
  const handleGenerateLink = () => {
    const shareData = `${details?.name}\n${details?.business_status}\n${details?.rating}\n${details?.vicinity}\n${details?.opening_hours}`;
    const url = `https://carefinder-by-jewel.vercel.app/hospitals?subject=${encodeURIComponent(
      "Check out this hospital"
    )}&body=${encodeURIComponent(shareData)}`;
    window.open(url, "_blank");
  };

  const getCsvData = () => {
    if (details) {
      return [
        {
          name: details.name,
          business_status: details.business_status,
          rating: details.rating,
          vicinity: details.vicinity,
        },
      ];
    }
    return [];
  };
  // SAVE HOSPITAL DATA TO USER PROFILE
  const handleSave = () => {
    const saveData = hospitalDetails.map((hospital: any) => ({
      name: hospital.name,
      business_status: hospital.business_status,
      rating: hospital.rating,
      vicinity: hospital.vicinity,
      opening_hours: hospital.opening_hours,
    }));

    // Save hospital details to local storage
    localStorage.setItem("savedHospitalDetails", JSON.stringify(saveData));

    // Navigate to the profile page
    navigate("/profile");
  };

  

  useEffect(() => {
    // Retrieve hospital details from local storage
    const storedHospitalDetails = localStorage.getItem("hospitalDetails");
    if (storedHospitalDetails) {
      setHospitalDetails(JSON.parse(storedHospitalDetails));
    } else {
      // Fetch hospital details from the API
      fetch(`/api/maps/place/details/${placeId}`)
        .then((res) => res.json())
        .then((data) => {
          setHospitalDetails(data.result);
          // Save hospital details to local storage
          localStorage.setItem("hospitalDetails", JSON.stringify(data.result));
          console.log("Hospital details", JSON.stringify(data.result));
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [placeId]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const RatingStars = ({ rating }: { rating: number }) => {
    const filledStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(5 - rating);
    const stars = filledStars + emptyStars;

    return <div className="rating">{stars}</div>;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="hospital_card_details_container">
        <div className="details-card">
          <h1 className="details-name">{details?.name}</h1>
          <h2 className="biz-status">{details?.business_status}</h2>
          <p className="formatted_address">{details?.vicinity}</p>
          <RatingStars rating={details?.rating} />
          {details?.opening_hours && <p className="opening_hours">Open Now</p>}
          <button className="hospital-button" onClick={handleSave}>
            Save
          </button>

          <CSVLink data={getCsvData()} className="csv">
            Download
          </CSVLink>
          <div className="share-button-container">
            <FaWhatsapp className="share-button" onClick={handleShare} />
            <FaEnvelope className="share-button" onClick={handleShareEmail} />
            <FaLink className="share-button" onClick={handleGenerateLink} />
          </div>
        </div>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyDYL048QSsNPEHs_crrIeZfrYH5_Qsh2Nk">
        {details && details.geometry && details.geometry.location && (
          <GoogleMap
            center={{
              lat: parseFloat(details.geometry.location.lat),
              lng: parseFloat(details.geometry.location.lng),
            }}
            zoom={20}
            mapContainerStyle={{ height: "300px" }}
          >
            <Marker
              position={{
                lat: parseFloat(details.geometry.location.lat),
                lng: parseFloat(details.geometry.location.lng),
              }}
              title={details.name}
            />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default HospitalDetails;

// import React, { useEffect, useState } from "react";
// import { CSVLink } from "react-csv";
// import "./hospitaldetails.css";
// import { Link, useNavigate } from "react-router-dom";

// type Props = {
//   name: string;
//   business_status: any;
//   rating: string;
//   details: any;
//   vicinity: string;
//   opening_hours: boolean;
// };

// const HospitalDetails: React.FC<Props> = ({
//   name,
//   business_status,
//   vicinity,
//   rating,
//   details,
//   opening_hours,
// }: Props) => {
//   const hospitalData = [
//     {
//       name: name,
//       business_status: business_status,
//       rating: rating,
//       vicinity: vicinity,
//       opening_hours: opening_hours,
//     },
//   ];

//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const handleShare = () => {
//     const shareData = {
//       title: "Hospital Details",
//       text: `Name: ${name}, Status: ${business_status}, Rating: ${rating}, Vicinity: ${vicinity}, Opening Hours: ${opening_hours}`,
//       url: window.location.href,
//     };

//     // CALL API ENDPOINT TO SHARE THE DATA
//     fetch("/api/maps/place/share", {
//       method: "POST",
//       body: JSON.stringify(shareData),
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//         alert("Data shared successfully");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Error sharing data");
//       });
//   };

//   const handleSave = () => {
//     // Perform the save operation here
//     // You can call an API endpoint or update the user's profile in the database
//     // with the hospital details
//     const saveData = {
//       title: "Hospital Details",
//       text: `Name: ${name}, Status: ${business_status}, Rating: ${rating}, Vicinity: ${vicinity}, Opening Hours: ${opening_hours}`,
//       url: window.location.href,
//     };

//     // CALL API ENDPOINT TO SAVE THE DATA
//     fetch("/api/maps/place/save", {
//       method: "POST",
//       body: JSON.stringify(saveData),
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         navigate("/profile")
//         console.log("Success:", data);
//         alert("Data saved successfully");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         // alert("Error saving data");
//       });
//       navigate("/profile")
//     alert("Hospital details saved!");
//   };

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   const RatingStars = ({ rating }: { rating: number }) => {
//     const filledStars = "★".repeat(rating);
//     const emptyStars = "☆".repeat(5 - rating);
//     const stars = filledStars + emptyStars;

//     return <div className="rating">{stars}</div>;
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div id="hospital_card_details_container">
//         <div className="details-card">
//           <h1>{details?.name}</h1>
//           <h2 className="biz-status">{details?.business_status}</h2>
//           <p className="formatted_address">{details?.vicinity}</p>
//           {/* <h4 className="ratings">{details?.rating}</h4> */}
//           <RatingStars rating={details?.rating} />
//           {details?.opening_hours && <p className="opening_hours">Open Now</p>}
//         </div>
//       </div>

//       <div className="hospital-button-container">
//         <button className="hospital-button" onClick={handleShare}>
//           Share
//         </button>

//         <button className="hospital-button" onClick={handleSave}>
//           Save
//         </button>

//         <CSVLink data={hospitalData} className="csv">
//           Download
//         </CSVLink>
//       </div>

//       <Link className="nav-link" style={{ color: "black" }} to="/">
//         Home
//       </Link>
//       <Link className="nav-link" style={{ color: "black" }} to="/hospitals">
//         Hospitals
//       </Link>
//     </div>
//   );
// };

// export default HospitalDetails;