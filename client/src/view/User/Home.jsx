import React, { useContext } from "react";
import NavigationBar from "../../components/Tools/Navigation.jsx";
import Header from "../../components/Tools/Header.jsx";
import { UserContext } from "../../../context/userContext.jsx";

const Home = () => {
    const { user } = useContext(UserContext);

    if(user === undefined) {
        return (
            <div className="flex justify-center items-center min-h-screen"> 
                <div className="cssloader">
                  <div className="triangle1"></div>
                  <div className="triangle2"></div>
                  <p className="text">Please Wait</p>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-[#f4f7fa] min-h-screen"> 
            <Header location={'Home'}/>
            <div className="block place-items-center pt-[2%]">
                <div className="w-full flex flex-col items-center">
                    <h1 className="homeHeader">WELCOME!
                    </h1>
                </div>
                <div>
                    <NavigationBar />
                </div>
            </div>
        </div>
    )
}

export default Home;
