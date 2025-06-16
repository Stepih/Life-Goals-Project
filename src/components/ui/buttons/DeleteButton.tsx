import { FC } from "react";

const DeleteButton:FC<{click: ()=>void}> = ({click}) => {

    return (
        <button onClick={click} className='cursor-pointer'>
            <i className="fas fa-trash text-gray-500 hover:text-red-600 transition"></i>
        </button>
    )
}

export default DeleteButton