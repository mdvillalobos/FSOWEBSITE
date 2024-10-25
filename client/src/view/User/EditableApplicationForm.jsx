import { React } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../components/Tools/Header.jsx';
import BackBtn from '../../components/UserComponents/ApplicationComponents/Return.jsx';
import EditableForm from '../../components/UserComponents/RepositoryComponents/EditableForm.jsx';

const EditableApplicationForm = () => {
    const location = useLocation();
    const { files, from } = location.state || {};
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
