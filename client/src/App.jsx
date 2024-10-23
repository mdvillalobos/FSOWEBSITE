import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Login from './view/Auth/Login.jsx';
import Registration from './view/Auth/Register.jsx';
import ProfileRegistration from './view/Auth/ProfileRegistration.jsx';
import EmailVerification from './view/Auth/EmailVerification.jsx';
import ForgotPassword from './view/Auth/ForgotPassword.jsx';
import VerifyOTP from './view/Auth/VerifyOtp.jsx';
import ResetPassword from './view/Auth/ResetPassword.jsx';

//user
import Home from './view/User/Home.jsx';
import Profile from './view/User/Profile.jsx';
import Report from './view/User/Report.jsx';
import ApplicationForReRanking from './view/User/ApplicationForReRanking.jsx';
import Repository from './view/User/Repository.jsx';
import EditableApplicationForm from "./view/User/EditableApplicationForm.jsx";
import ApplicationForm from './view/User/ApplicationForm.jsx';
import PersonalDetails from './view/User/PersonalDetails.jsx';
import PassAndSecurity from './view/User/PassAndSecurity.jsx';
import ViewSubmittedForm from "./view/User/ViewSubmittedForm.jsx";

//admin 
import AdminHome from './view/Admin/Home.jsx';
import Dashboard from './view/Admin/Dashboard.jsx';
import AdminProfile from './view/Admin/Profile.jsx';
import AdminSurvey from './view/Admin/Report.jsx';
import AdminApplication from './view/Admin/Application.jsx';
import ViewApplication from './view/Admin/ViewApplication.jsx';
import PersonalDetailsAdmin from "./view/Admin/PersonalDetailsAdmin.jsx";
import PasswordSecurityAdmin from "./view/Admin/PasswordSecurity.jsx";

//Error page
import ErrorPage from './view/Error/ErrorPage.jsx';
import Restriction from './view/Error/Restriction.jsx';
import useProtectRoutes from './hooks/Helpers/useProtectRoutes.jsx';

//images 
import { Helmet } from 'react-helmet';
import NotFound from './assets/images/NotFound.webp';
import NoData from './assets/images/NoData.webp';
import NuLogo from './assets/images/NU_shield.webp';
import maleProfile from './assets/images/male.webp';
import femaleProfile from './assets/images/female.webp';
import Done from './assets/images/done.webp'

/* axios.defaults.baseURL = 'http://localhost:3001'; */
axios.defaults.baseURL = 'https://nu-fso-54ab116ceb1f.herokuapp.com';
axios.defaults.withCredentials = true;

function App() {
  const { PageRouteProtection, AuthPageProtection} = useProtectRoutes();

  return (
    <>
      <Helmet>
          <link rel="preload" href={NotFound} as="image" />
          <link rel="preload" href={Done} as="image" />
          <link rel="preload" href={NoData} as="image" />
          <link rel="preload" href={NuLogo} as="image" />
          <link rel="preload" href={maleProfile} as="image" />
          <link rel="preload" href={femaleProfile} as="image" />
        </Helmet>
      <Routes>
        {/* authentication */}
      
        <Route exact path='/profileregistration' element={<ProfileRegistration />} />

        <Route element={<AuthPageProtection/>}>
          <Route exact path="/" element={ <Login/> }/>
          <Route exact path="/login" element={ <Login/> }/>
          <Route exact path="/register" element={ <Registration/> }/>
          <Route exact path="/registration" element={ <Registration/> }/>
          <Route exact path='/emailverification' element={ <EmailVerification/> }/>
    
          {/* forgot password */}
          <Route exact path='/forgotpassword' element={ <ForgotPassword/> }/>
          <Route exact path='/verifyotp' element={ <VerifyOTP/> }/>
          <Route exact path='/resetpassword' element={ <ResetPassword/> }/>
        </Route>
    
        {/* User */}
        <Route element={<PageRouteProtection providedRole={'user'}/>}>
          <Route exact path="/home" element={ <Home/> }/>
          <Route exact path="/profile" element={ <Profile/> }/>
          <Route exact path="/report" element={ <Report/> }/>
          <Route exact path="/repository" element={ <Repository /> }/>
          <Route exact path="/application" element={ <ApplicationForReRanking /> }/>
          <Route exact path="/settings/personaldetails" element={ <PersonalDetails/> }/>
          <Route exact path="/settings/password&security" element={ <PassAndSecurity/> }/>
    
          {/* Application forms */}
          <Route exact path='/application/form/edit' element={ <EditableApplicationForm/> }/>
          <Route exact path='/application/form' element={ <ApplicationForm/> }/>
          <Route exact path='/myform' element={<ViewSubmittedForm/>} />
        </Route>
        
        {/* admin */}
        <Route element={<PageRouteProtection providedRole={'admin'}/>}>
        <Route exact path="/admin/" element={ <AdminHome/> }/>
          <Route exact path="/admin/home" element={ <AdminHome/> }/>
          <Route exact path="/admin/profile" element={ <AdminProfile/> }/>
          <Route exact path="/admin/dashboard" element={ <Dashboard/> }/>
          <Route exact path="/admin/report" element={ <AdminSurvey/> }/>
          <Route exact path="/admin/application" element={ <AdminApplication/> }/>
          <Route exact path='/admin/viewapplication' element={ <ViewApplication/> }/>

          <Route exact path="/admin/settings/personaldetails" element={ <PersonalDetailsAdmin/> }/>
          <Route exact path="/admin/settings/password&security" element={ <PasswordSecurityAdmin/> }/>
        </Route>
    
        {/* Error Page */}
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/restriction'element ={<Restriction/>}/>
      </Routes>
    </>
  )
}

export default App
