import React from "react";
import NavigationBar from "../../components/Tools/Navigation.jsx";
import Header from "../../components/Tools/Header.jsx";

const Home = () => {
    return (
        <div className="bg-[#f4f7fa] h-screen max-2xl:h-full max-sm:h-screen max-md:h-auto max-lg:h-screen"> 
            <Header location={'Home'}/>
            <div className="block place-items-center pt-[2%]">
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-7xl font-black mt-16 mb-10 font-Poppins after:content-[''] after:flex after:mx-auto after:bg-NuBlue after:w-48 after:h-1 after:mt-5
                        max-md:text-7xl max-md:mb-16 max-[396px]:text-5xl">WELCOME!
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
