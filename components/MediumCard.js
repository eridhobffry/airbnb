import React from 'react'
import Image from 'next/image'

const Mediumcard = ({img, title}) => {
    return <div className='cursor-pointer hover:scale-105 transform transition duration-300 ease-out    '>
        <div className='relative w-80 h-80'>
            <Image src={img} layout='fill' className='rounded-xl' />
        </div>
        <h3 className='text-xl mt-3'>
            {title}
        </h3>
    </div>
}

export default Mediumcard
