import React from 'react';
import './about.css';
import { FaUserDoctor } from 'react-icons/fa6';
import hospital2 from '../assets/hospital2.png';
import { FaFileExport, FaSearch, FaShare } from 'react-icons/fa';


const About = () => {
  return (
    <section>

        <div className='container about__container'>        

        <div className="about__me">
                    <div className="about__me-image">
                        <img src={hospital2} alt=""/>
                    </div>
                  </div>
                
                    <div className="about__content">
                        <div className="about__cards">
                            <article className="about__card"> 
                                <FaUserDoctor className= "about__icon"/>
                                <h5>Search Doctors</h5>
                                <small>Effortlessly Find the Best Hospitals Near You</small>  
                            </article>
                            <article className="about__card">
                                <FaSearch className= "about__icon"/>
                               <h5>Search Hospitals</h5>
                                <small>Effortlessly Find the Best Doctors Near You</small>
                            </article>
                            <article className="about__card">
                                <FaFileExport className= "about__icon"/>
                                <h5>Export Hospitals</h5>
                                <small>Save list of hospitals.</small>
                            </article>
                            <article className="about__card">
                                <FaShare className= "about__icon"/>
                                <h5>Share Hospitals</h5>
                                <small>Share the list of hospitals with others. </small>
                            </article>
                           
                        </div>
                        <p className="description">Carefinder is a platform where users can search for hosiptals in their areas, export hospital details for your records and  enhance your healthcare experience by connecting with others and sharing valuable resources.</p>
                           <a href="/hospitals" className="btn btn-primary">Book an Appointment</a>
                    </div>
            </div>

    </section>
  )
}

export default About