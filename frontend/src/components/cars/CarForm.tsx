"use client"

import { CreateCarRoute } from '@/http';
import { CarHint } from '@/store/controls';
import { AxiosError } from 'axios';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';

interface ICarFormProps {
}

const CarForm: React.FunctionComponent<ICarFormProps> = (props) => {
    const dispatch = useDispatch()
    const { categories, carHint } = useSelector((state: any) => state.controls)
    const [submitLoading, setsubmitLoading] = React.useState(false)
    const [inputs, setinputs] = React.useState({
        category: "",
        reg_no: "",
        modal: "",
        color: ""
    })


    // handle inputs changes
    const handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setinputs((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }
    // create car
    const createCar = async () => {
        const { reg_no, category, color, modal } = inputs
        if (!reg_no || !category || !color || !modal) {
            toast.error("some fields are empty!", { position: 'top-center', duration: 2000 })
            return
        }

        try {
            setsubmitLoading(true)
            const request = await CreateCarRoute({
                carCategory: category,
                carColor: color,
                carModal: modal,
                carRegno: reg_no
            })

            if (request?.status === 201) {
                const { data } = request
                setTimeout(() => {
                    setsubmitLoading(false)
                }, 2000);
                dispatch(CarHint({
                    Hint: !carHint
                }))
                setinputs({ category: '', color: '', modal: '', reg_no: '' })
                toast.success("Successfully created!", { duration: 2000, position: 'top-center' })
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
        <div className="bg-white drop-shadow-md lg:max-w-md w-full max-w-full p-3 rounded-md">
            <div className="mb-1">
                <label htmlFor="Select Category" className="block text-sm font-medium text-gray-900 dark:text-white">Select Car Category</label>
                <select id="Select Category" name='category' onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                    <option >Choose a category</option>
                    {categories?.length >= 1 &&
                        categories?.map((val: any, index: number) => {
                            return <option key={index} value={val?.carCategory}>{val?.carCategory}</option>
                        })}
                </select>
            </div>
            <div className="mb-1">
                <label htmlFor="reg_no" className="block mb-1 mt-2 text-sm font-medium text-gray-900 dark:text-white">Car Registration no.</label>
                <input type="text" id="reg_no" value={inputs.reg_no} name='reg_no' onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" placeholder='2019...' required />
            </div>
            <div className="mb-1">
                <label htmlFor="color" className="block mb-1 mt-2 text-sm font-medium text-gray-900 dark:text-white">Car color</label>
                <input type="text" id="color" value={inputs.color} name='color' onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" placeholder='white' required />
            </div>
            <div className="mb-5">
                <label htmlFor="modal" className="block mb-1 mt-2 text-sm font-medium text-gray-900 dark:text-white">Car modal</label>
                <input type="text" id="modal" value={inputs.modal} name='modal' onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" placeholder='honda' required />
            </div>
            <button type="submit"
                disabled={submitLoading} onClick={createCar} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center outline-none relative flex flex-row justify-center items-center gap-2 ${submitLoading ? 'opacity-50 cursor-wait hover:bg-blue-500 bg-blue-500' : ''
                    }`}> {submitLoading ? (
                        <>
                            <span>Creating...</span>
                            <ImSpinner9 className="animate-spin" />
                        </>
                    ) : (
                        'Create Car'
                    )}</button>
        </div>
    </>;
};

export default CarForm;
