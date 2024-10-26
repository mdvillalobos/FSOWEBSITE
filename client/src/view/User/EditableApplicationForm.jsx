import { React } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../components/Tools/Header.jsx';
import BackBtn from '../../components/UserComponents/ApplicationComponents/Return.jsx';
import EditableForm from '../../components/UserComponents/RepositoryComponents/EditableForm.jsx';

const EditableApplicationForm = () => {
    const location = useLocation();
    const { files, from } = location.state || {};
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
        <div className='bg-[#f4f7fa] h-full'>
            <Header location={ files?.applyingFor }/>
            <div className="px-16 py-2">
              <BackBtn from ={from}/>
                <div className='bg-white py-8 px-10 mx-36 border-2 rounded-xl overflow-hidden'>
                    <EditableForm 
                        files = { files }
                        from = { from }
                    />
                </div>
            </div>  
        </div>
    )
}

export default EditableApplicationForm
