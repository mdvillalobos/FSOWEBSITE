import React from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineFileSync } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { RiSurveyLine } from "react-icons/ri";


const navigation = () => {
  return (
    <div>
      <div className="nav-container">
        <Link to="/profile" className="navigation">
          <div className="iconContainer">
            <BsFillPersonFill className="icon"/>
          </div>
          <div className="nameContainer">
            <h1 className="nav-Name">My Profile</h1>
            <p className="nav-Definition">
              View your personal information and educational background.
            </p>
          </div>
        </Link>
        <Link to="/survey" className="navigation">
          <div className="iconContainer">
            <RiSurveyLine className="icon"/>
          </div>
          <div className="nameContainer">
            <h1 className="nav-Name">Survey</h1>
            <p className="nav-Definition">Collection of documents forms and credentials.</p>
          </div>
        </Link>
        <Link to="/report" className="navigation">
          <div className="iconContainer">
            <TbReport className="icon" fontWeight='normal '/>
          </div>
          <div className="nameContainer">
            <h1 className="nav-Name">Weekly Reports</h1>
            <p className="nav-Definition">Stores and monitors weekly accomplishments. </p>
          </div>
        </Link>
        <Link to="/application" className="navigation">
          <div className="iconContainer">
            <AiOutlineFileSync className="icon"/>
          </div>
          <div className="nameContainer">
           <h1 className="nav-Name">Apply For Re-ranking</h1>
           <p className="nav-Definition">
             View offered ranking position and have the opportunity to apply.
           </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default navigation;
