import React from 'react'
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";

const AdminNav = () => {
  return (
    <div>
        <div className="nav-container">
            <Link to="/admin/profile" className='navigation'>
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
            <Link to="/admin/dashboard" className='navigation'>
                <div className="iconContainer">
                    <BiSolidDashboard className="icon"/>
                </div>
                <div className="nameContainer">
                    <h1 className="nav-Name">Dashboard</h1>
                    <p className="nav-Definition">
                        View and analyze the data from the surveys.
                    </p>
                </div>
            </Link>
            <Link to="/admin/report" className='navigation'>
                <div className="iconContainer">
                    <TbReport className="icon"/>
                </div>
                <div className="nameContainer">
                    <h1 className="nav-Name">Reports</h1>
                    <p className="nav-Definition">
                        View all the weekly and daily reports of faculty.
                    </p>
                </div>
            </Link>
            <Link to="/admin/application" className='navigation'>
                <div className="iconContainer">
                    <AiOutlineFileSearch className="icon"/>
                </div>
                <div className="nameContainer">
                    <h1 className="nav-Name">Applications for <br/>Re-Ranking</h1>
                    <p className="nav-Definition">
                        View all the applications for Re-ranking.
                    </p>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default AdminNav
