import React from 'react'
import NavigationBar from "../../components/Tools/AdminNav.jsx";
import Header from "../../components/Tools/Header.jsx";

const Home = () => {
    return (
        <div className="background-gradient h-screen max-2xl:h-full max-sm:h-screen max-md:h-auto max-lg:h-screen"> 
            <Header location='Home' />
            <div className="block place-items-center mt-[2%]">
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-[5.5rem] font-black mt-12 mb-10 font-Poppins after:content-[''] after:flex after:mx-auto after:bg-NuBlue after:w-48 after:h-1
                    max-md:text-5xl max-md:mt-12">WELCOME!</h1>
                </div>
                <div>
                    <NavigationBar />
                </div>
            </div>
        </div>
    )
}

export default Home
