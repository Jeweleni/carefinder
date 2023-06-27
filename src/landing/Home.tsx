import React from "react";
import "./home.css";
import { AiOutlineSearch } from "react-icons/ai";
import { GiDoctorFace } from "react-icons/gi";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    
    <div className="careheader_container">
      <div className="careheader_wrapper">
        <div className="careheader_head">
          <h1 className="careheader_heading">
            Search Your Health Care Provider
          </h1>
          
         
          <div className="careheader_input">
          <AiOutlineSearch className="careheader_input_icon" />
            <input
              type="text"
              placeholder="Federal Medical Center, Ebutte Metta,Lagos State"
              className="careheader_input_element"
              onClick={
                () => {
                  navigate ("/signup")
                }
              }
            />
          </div>
        </div>
        <div className="careheader_select">
         
          <div className="careheader_item">
            <MdOutlineTipsAndUpdates className="careheader_select_icon" />
            <p onClick={
              () => {
                navigate ("/HealthTips")
              }
            } >Health Tips</p>
          </div>
          <div className="careheader_item">
            <GiDoctorFace className="careheader_select_icon" />
            <p onClick={
              () => { 
                navigate ("/doctors")
              }
            }>Doctor</p>
          </div>
        </div>
      </div>
    </div>
 
  );
};

export default Home;