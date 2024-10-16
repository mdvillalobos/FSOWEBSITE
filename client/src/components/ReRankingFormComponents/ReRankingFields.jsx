import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { RxCross2 } from "react-icons/rx";
import { GoPaperclip } from "react-icons/go";
import { FocusOn } from 'react-focus-on'
import ViewImage from '../AdminComponents/ApplicationComponents/ViewFormComponents/ViewImage';
import ViewPdf from '../AdminComponents/ApplicationComponents/ViewFormComponents/ViewPdf.jsx';
import useToast from '../../hooks/Helpers/useToast';

const ReRankingFields = ({ requirement, data, setData }) => {
    const { Toast } = useToast();
    console.log(data)
    const removeFile = () => {
        setData(null)
    }

    const [ showImage, setShowImage ] = useState({
        show: false,
        image: null,
        isPdf: null            
    });

    const handleViewImage = (imagePath) => {
        const reader = new FileReader();
        const imageToShow = data.filePath ? data.filePath : imagePath;

        reader.onload = (event) => {
            const fileType = imageToShow.type || imageToShow.name.split('.').pop().toLowerCase();
            
            if (fileType.startsWith('image/')) {
                setShowImage({
                    show: true,
                    image: event.target.result,
                    isPdf: false
                });
            } else if (fileType === 'application/pdf' || fileType === 'pdf') {
                setShowImage({
                    show: true,
                    image: event.target.result,
                    isPdf: true
                });
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Invalid File'
                })
            }
        };

        reader.readAsDataURL(imagePath);
    }

    return (
        <div>
            {showImage.show && (
                showImage.isPdf ? (
                    <FocusOn>
                        <ViewPdf 
                            handleExit ={() => setShowImage({ show: false })}
                            file={showImage.image}
                        />
                    </FocusOn>
                ) : (
                    <FocusOn>
                        <ViewImage 
                            handleExit ={() => setShowImage({ show: false })}
                            image={showImage.image}
                        />
                    </FocusOn>
                )
            )}
            <div className="w-full flex justify-between border-b-2 border-[#35408E] py-5">
                <ReactMarkdown className='text-[0.9rem] w-[33vw]'>{requirement}</ReactMarkdown>
                <div className='flex space-x-2 text-sm '>
                    {data ? (
                        <span className='flex justify-between items-center border px-2 text-sm rounded-md h-14 w-52 overflow-hidden'>
                            <div className="flex">
                                <GoPaperclip size={'1.9rem'} className='mr-2 translate-y-[1px] text-[#41518d]'/>
                                <button type="button" onClick={() => handleViewImage(data)}>
                                    <p className='text-sm w-32 overflow-hidden whitespace-nowrap text-ellipsis'>{data.filename || data.name}</p>
                                    <p className='text-gray-500 text-xs'>5mb  </p>
                                </button>
                            </div>
                        <button onClick={() => removeFile()}><RxCross2/></button>
                        </span>
                    ) : (
                        <label className='flex justify-center items-center border px-1.5 text-sm rounded-md h-12 w-52 bg-gray-200 cursor-pointer'>
                            <input type='file' className='hidden' accept=".png, .jpg, .jpeg, .pdf" onChange={(e) => setData(e.target.files[0])}/>
                            <GoPaperclip size={'1rem'} className='mr-2 translate-y-[1px] text-[#41518d]' />
                            <p className='text-sm'>Browse Files</p>
                        </label>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReRankingFields
