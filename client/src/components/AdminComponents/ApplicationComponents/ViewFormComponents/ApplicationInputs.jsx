import React from 'react'
import { PiImagesLight } from "react-icons/pi";

const ViewPageMaster = ({requirement, imagePath, checkedValue, setCheckedValue, handleViewImage}) => {
    return (
        <div className="w-full flex justify-between border-b-2 border-[#35408E] py-4">
            <div className='text-[0.9rem]'>
                <p className='whitespace-pre-wrap w-[33vw]'>{requirement}</p>
            </div>
            <div className='flex space-x-4'>
                <div>
                    <button onClick={()=> handleViewImage(imagePath)} className='imageButton'>
                        <PiImagesLight size='1.8rem' className='translate-y-1'/>
                        <div className="imageNameContainer">
                            <p className='uploadName'>Uploaded File</p>
                            <p className='imagePathName'>{imagePath}</p>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col space-y-2 mt-2">
                    <div className="flex space-x-2">
                        <input type="checkbox" value='Approved' name='Declined' checked={checkedValue === 'Approved'} onChange ={(e) => setCheckedValue(e.target.value)} className='checkBoxApprove'/>
                        {checkedValue === 'Approved' ? 
                        (
                            <p className='text-xs font-medium text-green-500 translate-y-0.5'>Approve</p>
                        ) : (
                            <p className='text-xs font-medium translate-y-0.5'>Approve</p>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        <input type="checkbox" value='Declined' name='Declined' checked={checkedValue === 'Declined'} onChange ={(e) => setCheckedValue(e.target.value)} className='checkBoxDecline'/>
                        {checkedValue === 'Declined' ? 
                        (
                            <p className='text-xs font-medium text-red-500 translate-y-0.5'>Decline</p>
                        ) : (
                            <p className='text-xs font-medium translate-y-0.5'>Decline</p>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPageMaster
