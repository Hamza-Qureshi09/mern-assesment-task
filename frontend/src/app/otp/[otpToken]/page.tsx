"use client"

import * as React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { VerifyOTP } from '@/http';
import { AuthControlEntry } from '@/store/controls';
import { useRouter } from 'next/navigation';

interface IOtpPageProps {
}

const OtpPage: React.FunctionComponent<IOtpPageProps> = (props: any) => {
    const { params: { otpToken } } = props
    const dispatch = useDispatch()
    const router=useRouter()
    const { registryCredentials: { email, token } } = useSelector((state: any) => state.controls)
    const [submitLoading, setsubmitLoading] = React.useState(false)

    const [inputs, setinputs] = React.useState({
        otp: ""
    })


    // handle inputs changes
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setinputs((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    // verify otp 
    const verifyOtpFunc = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { otp } = inputs
        if (!otp || !otpToken || !token) {
            toast.error("Unauthorized!", { position: 'top-center', duration: 2000 })
            return
        }

        try {
            setsubmitLoading(true)
            const request = await VerifyOTP({
                hash: otpToken, otp, email
            })

            if (request?.status === 200) {
                const { data } = request

                dispatch(AuthControlEntry({
                    authorization: data?.authorization,
                    activation: data?.activation,
                    userDetails: data?.userInfo
                }))
                setTimeout(() => {
                    setsubmitLoading(false)
                }, 5000);
                router.replace('/')
                toast.success("Account verification complete!", { duration: 3000, position: 'top-center' })
                return;
            }
        } catch (error: AxiosError | any) {
            toast.error(error ? error.message : error?.response?.data?.message, { duration: 2000, position: 'top-center' })
            setTimeout(() => {
                setsubmitLoading(false)
            }, 2500);
            return
        }
    }
    return <>
        {/* otp verification page {params.otpToken} */}
        <div className='w-full flex flex-col justify-center items-center'>
            <section className='w-full'>
                <nav className="absolute top-0 z-30 flex flex-wrap items-center justify-between w-full px-4 py-2 mt-6 mb-4 shadow-none lg:flex-nowrap lg:justify-start">
                </nav>

                <div className=''>
                    <div className="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover w-full ">
                        <div className="container z-1  mx-auto   w-[95%] ">
                            <div className="flex flex-wrap rounded-lg shadow-lg bg-white md:shadow-none mt-20 md:mt-4 lg:ml-10" >
                                <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py-4 rounded-2xl bg-clip-border">
                                        <div className="p-6 pb-0 mb-0">
                                            <h4 className="font-bold font-Merriweather text-xl text-gray-800">OTP Verification</h4>
                                            <p className="mb-0 font-Lato">Otp here for account verification.</p>
                                        </div>
                                        <div className="flex-auto p-6">
                                            <form method="POST" onSubmit={verifyOtpFunc}>
                                                <div className="mb-4">
                                                    <input onChange={handleInput}
                                                        value={inputs.otp}
                                                        name="otp" type="otp" placeholder="Enter your otp here..." required className="focus:shadow-primary-outline text-sm leading-5 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding p-3 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" />
                                                </div>

                                                <div className="text-center">
                                                    <button
                                                        type="submit"
                                                        disabled={submitLoading}
                                                        className={` w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white tracking-wider relative flex flex-row justify-center items-center gap-2 ${submitLoading ? 'opacity-50 cursor-wait hover:bg-blue-500 bg-blue-500' : ''
                                                            }`}>
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <svg className="h-5 w-5 text-blue-200 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        {submitLoading ? (
                                                            <>
                                                                <span>verifying...</span>
                                                                <ImSpinner9 className="animate-spin" />
                                                            </>
                                                        ) : (
                                                            'Verify'
                                                        )}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
                                    <div className="relative flex flex-col justify-center h-full bg-cover px-24 m-4 overflow-hidden bg-[url('/images/02.jpg')] bg-no-repeat rounded-xl ">
                                        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60 "></span>
                                        <h4 className="z-20 mt-12 font-bold text-white text-4xl mb-6 font-Merriweather">“Convenience clicks, passion fuels, and the world's at your doorstep.”</h4>
                                        <p className="z-20 text-white ">Hamza Qureshi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>;
};

export default OtpPage;
