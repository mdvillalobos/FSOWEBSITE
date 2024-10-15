import { React } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../components/Tools/Header.jsx';
import BackBtn from '../../components/UserComponents/ApplicationComponents/Return.jsx';
import RepositoryForm from '../../components/UserComponents/RepositoryComponents/RepositoryForm.jsx';

const PreApplyForm = () => {
    const location = useLocation();
    const { files } = location.state || {};
    return (
        <div className='bg-[#f4f7fa] h-full'>
            <Header location={ files?.applyingFor }/>
            <div className="px-16 py-2">
              <BackBtn/>
                <div className='bg-white py-8 px-10 mx-36 shadow-md rounded-xl overflow-hidden'>
                    <RepositoryForm 
                        files = {files}
                    />
                </div>
            </div>  
        </div>
    )
}

export default PreApplyForm
