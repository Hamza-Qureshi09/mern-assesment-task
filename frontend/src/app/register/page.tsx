"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { userRegistration } from '@/store/controls';
import { RegistrationRoute } from '@/http';
import { ImSpinner9 } from 'react-icons/im';
import Link from 'next/link';


interface ISignupProps {
}

const Signup: React.FunctionComponent<ISignupProps> = (props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [submitLoading, setsubmitLoading] = React.useState(false)
    const [inputs, setinputs] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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

    // password validation
    const validatePassword = (password: string) => {
        // Password should contain at least one uppercase letter, one lowercase letter, and one number.
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        if (!uppercaseRegex.test(password)) {
            toast.error("Password should contain at least one uppercase letter", { duration: 3000, position: 'top-center' })
            return;
        } else if (!lowercaseRegex.test(password)) {
            toast.error("Password should contain at least one lowercase letter", { duration: 3000, position: 'top-center' })
            return;
        } else if (!numberRegex.test(password)) {
            toast.error("Password should include at least one number ", { duration: 3000, position: 'top-center' })
            return;
        } else if (!(password.length >= 8)) {
            toast.error("Password should be at least 8 characters long", { duration: 3000, position: 'top-center' })
            return;
        }
        return (
            uppercaseRegex.test(password) &&
            lowercaseRegex.test(password) &&
            numberRegex.test(password) &&
            password.length >= 8// Password should be at least 8 characters long
        );
    };

    // registeration of user
    const registeration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { username, email, password, confirmPassword } = inputs

        if (!username || !email || !password || !confirmPassword) {
            toast.error("please fill all the fields first!", { duration: 3000, position: 'top-center' })
            return
        }


        if (validatePassword(password)) {
            if (password === confirmPassword) {
                try {
                    setsubmitLoading(true)
                    let request = await RegistrationRoute({
                        username, useremail: email, password, confirmPassword
                    })

                    if (request?.status === 201) { 
                        const { data } = request
                        
                        toast.success("Registration successfull!", { duration: 3000, position: 'top-center' })
                        setTimeout(() => {
                            setsubmitLoading(false)
                        }, 3000);
                        dispatch(userRegistration({
                            registryUserDetails: data.user
                        }))
                        
                        return router.push(`/otp/${data.user.token}`)
                    }

                } catch (error: AxiosError | any) {
                    toast.error(error?.response?.data?.message, { duration: 2000, position: 'top-center' })
                    setTimeout(() => {
                        setsubmitLoading(false)
                    }, 3000);
                    return
                }
            } else {
                toast.error("Passwords not match!", { duration: 5000, position: 'top-center' })
                return;
            }
        } else {
            toast.error("Passwords validation failed! it should be at least 8 characters long", { duration: 3000, position: 'top-center' })
            return;
        }
    }


    return <>
        <div className='w-full flex flex-col justify-center items-center'>
            <section className=' w-full'>
                <nav className="absolute top-0 z-30 flex flex-wrap items-center justify-between w-full px-4 py-2 mt-6 mb-4 shadow-none lg:flex-nowrap lg:justify-start">
                </nav>
                <div className="m-0 font-sans antialiased font-normal text-start text-base leading-default text-slate-500">
                    <div className="min-h-screen mb-16">
                        <div className="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover min-h-50-screen rounded-xl bg-[url('/images/02.jpg')] bg-center bg-no-repeat"
                        >
                            <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60"></span>
                            <div className="container z-10 mx-auto">
                                <div className="flex flex-wrap justify-center  mx-auto">
                                    <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                                        <h1 className="mt-12 mb-2 text-white text-2xl md:text-3xl font-Poppins font-bold">Welcome!</h1>
                                        <p className="text-white font-Lato">Register Your Account so you can use our services.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container m-auto  max-w-[95%]">
                            <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48 ">
                                <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border drop-shadow-lg">
                                        <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                                            <h5 className='font-Merriweather font-bold text-xl text-gray-800'>Sign up</h5>
                                        </div>

                                        <div className="flex-auto p-6">
                                            <form method="POST" onSubmit={registeration}>

                                                <div className="mb-4">
                                                    <input className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" onChange={handleInput}
                                                        value={inputs.username}
                                                        id="username" name="username" type="text" placeholder="Username" required />
                                                </div>
                                                <div className="mb-4">
                                                    <input className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" onChange={handleInput}
                                                        value={inputs.email}
                                                        id="email" name="email" type="email" placeholder="Email" required />
                                                </div>

                                                <div className="mb-4">
                                                    <input className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" onChange={handleInput}
                                                        value={inputs.password}
                                                        id="password" name="password" type="password" placeholder="Password" required />
                                                </div>

                                                <div className="mb-4">
                                                    <input className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" onChange={handleInput}
                                                        value={inputs.confirmPassword}
                                                        id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" type="password" required />
                                                </div>

                                                <div className="text-center">
                                                    <button
                                                        type="submit"
                                                        disabled={submitLoading}
                                                        className={` w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white tracking-wider relative flex flex-row justify-center items-center gap-2 ${submitLoading ? 'opacity-50 cursor-wait hover:bg-blue-500 bg-blue-500' : ''}`}>
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <svg className="h-5 w-5 text-blue-200 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                        {submitLoading ? (
                                                            <>
                                                                <span>Sign up...</span>
                                                                <ImSpinner9 className="animate-spin" />
                                                            </>
                                                        ) : (
                                                            'Sign up'
                                                        )}</button>
                                                </div>
                                                <p className="mt-4 mb-0 leading-normal text-sm">Already have an account? <Link href="/login" className="font-bold text-slate-700">Sign in</Link></p>
                                            </form>
                                        </div>
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

export default Signup;
