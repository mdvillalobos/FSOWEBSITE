import React from 'react'
import ReactMarkdown from 'react-markdown';
import { BsFileEarmarkImage } from "react-icons/bs";
import { FaRegFileImage } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineUpload } from "react-icons/hi";
import { IoIosImages } from "react-icons/io";
import { GoPaperclip } from "react-icons/go";


const ReRankingFields = ({ requirement, data, setData }) => {
    const removeFile = () => {
        setData(null)
    }
    return (
        <div>
            <div className="w-full flex justify-between border-b-2 border-[#35408E] py-5">
                <ReactMarkdown className='text-[0.9rem] w-[33vw]'>{requirement}</ReactMarkdown>
                <div className='flex space-x-2 text-sm '>
                    {/* <div className="inputContainer">
                        <p className='text-sm font-normal'>Attached Image:</p>
                        <input type="file" className='inputFileFields ' onChange={(e) => setData(e.target.files[0])}/>
                    </div> */}
                    {/* <span className='flex justify-center items-center border px-1.5 text-sm rounded-md h-12 w-52 bg-gray-200'>
                        <HiOutlineUpload size={'1rem'} className='mr-2 translate-y-[1px] text-[#41518d]'/>
                        <p className='text-sm'>Browse Files</p>
                    </span> */}
                
                    {data ? (
                        <span className='flex justify-between items-center border px-2 text-sm rounded-md h-14 w-52 overflow-hidden'>
                            <div className="flex">
                                <GoPaperclip size={'1.9rem'} className='mr-2 translate-y-[1px] text-[#41518d]'/>
                                <div className="">
                                    <p className='text-sm w-32 overflow-hidden whitespace-nowrap text-ellipsis'>{data.name}</p>
                                    <p className='text-gray-500 text-xs'>5mb  </p>
                                </div>
                            </div>
                        <button onClick={() => removeFile()}><RxCross2/></button>
                        </span>
                    ) : (
                        <label className='flex justify-center items-center border px-1.5 text-sm rounded-md h-12 w-52 bg-gray-200 cursor-pointer'>
                            <input type='file' className='hidden' onChange={(e) => setData(e.target.files[0])}/>
                            <GoPaperclip size={'1rem'} className='mr-2 translate-y-[1px] text-[#41518d]' />
                            <p className='text-sm'>Browse Files</p>
                        </label>
                    )}
                    {/* <button className='bg-[#41518d] px-6 py-2 text-white rounded-md h-[5.3vh]'>Browse Files</button> */}
                </div>
            </div>
        </div>
    )
}

export default ReRankingFields
