import React from 'react';
import { useLocation } from 'react-router-dom';
import ViewSubmitted from '../../components/UserComponents/ApplicationComponents/ViewSubmitted';
import Return from '../../components/UserComponents/ApplicationComponents/Return.jsx';
import Header from "../../components/Tools/Header.jsx";

const ViewSubmittedForm = () => {
    const location = useLocation();
    const { myForm } = location.state || {};
    return (
        <div className='bg-[#f4f7fa] h-full'>
            <Header location={ myForm?.applyingFor }/>
            <div className="px-16 py-2">
              <Return from ={'Application For Re-Ranking'}/>
                <div className='bg-white py-8 px-10 mx-36 shadow-md rounded-xl overflow-hidden'>
                    <ViewSubmitted 
                        rest = { myForm }
                    />
                </div>
            </div>  
        </div>
    )
}

export default ViewSubmittedForm
