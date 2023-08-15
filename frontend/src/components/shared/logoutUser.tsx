"use client"

import * as React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { useRouter } from "next/navigation"
import { LogoutUser } from '@/http/index'

interface ILogoutUserAccountProps {
}

const LogoutUserAccount: React.FunctionComponent<ILogoutUserAccountProps> = (props) => {
    const router = useRouter()
    const logoutuser = async () => {
        const res = await LogoutUser()

        if (res.status === 200) {
            router.replace('/login')
            return
        }
    }
    return <>
        <div onClick={logoutuser} className="fixed bg-blue-500 right-2 top-1 h-8 w-8 flex flex-col justify-center items-center rounded-md cursor-pointer">
            <BiLogOut className='text-xl text-white' />
        </div>
    </>;
};

export default LogoutUserAccount;
