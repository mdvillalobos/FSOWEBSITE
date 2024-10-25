import React from "react";
import NavigationBar from "../../components/Tools/Navigation.jsx";
import Header from "../../components/Tools/Header.jsx";

const Home = () => {
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
