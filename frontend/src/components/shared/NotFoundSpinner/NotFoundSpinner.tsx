"use client"
import React from 'react'
import { ImSpinner9 } from 'react-icons/im';

const NotFoundSpinner = ({ message }: any) => {
    return (
        <div className='flex flex-col justify-center items-center flex-wrap w-full my-8 flex-1 mt-[5rem]'>
            <h1 className='font-bold font-Alaktra text-gray-500 max-w-max flex flex-row items-center gap-2 text-xl md:text-2xl capitalize'> {message} <ImSpinner9 className='animate-spin duration-700' /></h1>
        </div>
    )
}

export default NotFoundSpinner