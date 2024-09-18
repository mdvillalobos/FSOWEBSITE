import React from 'react'

const ConfirmModal = ({handleSubmitForm, handleClose}) => {
    return (
        <div className='bg-white shadow-lg w-[50vw] h-[50vh]'>
            <p>Are you sure?</p>
            
            <div className="flex">
                <button>Cancel</button>
                <button>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmModal
