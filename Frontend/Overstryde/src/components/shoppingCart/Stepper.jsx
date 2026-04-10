import React, { useState } from 'react'

export const Stepper = () => {
    const [count, setCount] = useState(1)
    function handleClick(operation) {
        switch (operation) {
            case "add":
                setCount(count + 1)
                break;
            case "subs":
                if(count<=1)return
                setCount(count - 1)
                break;
            default:
                break;
        }
    }
    return (
        <div className='flex justify-center bg-gray-100 rounded-sm gap-3'>
            <button className='transform duration-300 active:-translate-y-0.5' onClick={() => handleClick("subs")}>
                -
            </button>
            <p>{count}</p>
            <button className='transform duration-300 active:-translate-y-0.5' onClick={() => handleClick("add")}>
                +
            </button>
        </div>
    )
}
