import { FC } from "react";



const EditButton:FC<{click: () => void}> = ({click}) => {

    return (
        <button onClick={click} className='cursor-pointer text-gray-400 hover:text-gray-600 edit-daily-task'>
            <i className='fas fa-edit'></i>
        </button>
    )
}

export default EditButton