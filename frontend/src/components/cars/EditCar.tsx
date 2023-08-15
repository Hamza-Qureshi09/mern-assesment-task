"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from "react-icons/md";
import { CarHint, CategoryHint, EditCarModalToggle, EditCarRecord, } from '@/store/controls';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { UpdateCarRoute } from '@/http';
import { AxiosError } from 'axios';

interface IEditCarProps {
}

const EditCar: React.FunctionComponent<IEditCarProps> = (props) => {
    const dispatch = useDispatch()
    const { editCarRecord, editCarModalToggle, carHint } = useSelector((state: any) => state.controls)
    const [submitLoading, setsubmitLoading] = React.useState(false)
    const [inputs, setinputs] = React.useState({
        category: '',
        carModal: '',
        carColor: '',
        carRegno: ''
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
    const CloseModal = () => {
        dispatch(EditCarRecord({
            Record: {}
        }))
        dispatch(EditCarModalToggle({
            Status: false
        }))
        setinputs({ carColor: '', carModal: '', carRegno: '', category: '' })
    }
    const editCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { carColor, carModal, carRegno, category } = inputs
        if (!category || !editCarRecord._id || !carColor || !carRegno || !carModal) {
            toast.error("incomplete information try again!", { position: 'top-center', duration: 2000 })
            return
        }
        try {
            setsubmitLoading(true)
            const request = await UpdateCarRoute({
                carCategory: category,
                carId: editCarRecord._id,
                carModal,
                carRegno, 
                carColor
            })

            if (request?.status === 200) {
                const { data } = request
                toast.success("Successfully updated!", { duration: 2000, position: 'top-center' })
                setinputs({ carColor: '', carModal: '', carRegno: '', category: '' })
                dispatch(CarHint({
                    Hint: !carHint
                }))
                dispatch(EditCarRecord({
                    Record: {}
                }))
                dispatch(EditCarModalToggle({
                    Status: false
                }))
                return;
            }
        } catch (error: AxiosError | any) {
            toast.error(error ? error.message : error?.response?.data?.message, { duration: 2000, position: 'top-center' })
            return
        } finally {
            setTimeout(() => {
                setsubmitLoading(false)
            }, 2000);
        }

    }
    React.useEffect(() => {
        const { carColor, carModal, carRegno, carCategory } = editCarRecord
        setinputs({
            carColor, carModal, carRegno, category: carCategory?.carCategory
        })
    }, [editCarModalToggle])
    return <>
        {editCarModalToggle &&
            <div className=" before:absolute before:backdrop-blur-sm before:backdrop-brightness-50 before:h-screen before:w-full flex flex-col justify-center items-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 p-4 w-full md:inset-0 h-modal md:h-full z-[100]">
                <div className="relative w-full max-w-md h-screen  flex flex-col justify-center   md:h-auto">

                    <div className="relative bg-white rounded-lg shadow ">
                        <button type="button" className="absolute top-3 right-2.5 ">
                            <MdClose className='text-2xl font-bold' onClick={CloseModal} />
                        </button>
                        <form onSubmit={editCar}>
                            <div className="py-6 px-7 lg:px-8 font-Poppins">
                                <h3 className="mb-4 text-xl  text-gray-900 font-Alaktra font-semibold">Edit Car</h3>

                                <div>
                                    <label htmlFor="category" className="block  text-sm font-medium text-gray-900">Category</label>
                                    <input type="text"
                                        readOnly={true}
                                        onChange={handleInput}
                                        value={inputs.category}
                                        name="category" id="category" placeholder="Bus" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required />
                                </div>
                                <div>
                                    <label htmlFor="carRegno" className="block  text-sm font-medium text-gray-900">Reg no.</label>
                                    <input type="text"
                                        onChange={handleInput}
                                        value={inputs.carRegno}
                                        name="carRegno" id="carRegno" placeholder="2019" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required />
                                </div>
                                <div>
                                    <label htmlFor="carColor" className="block  text-sm font-medium text-gray-900">Car Color</label>
                                    <input type="text"
                                        onChange={handleInput}
                                        value={inputs.carColor}
                                        name="carColor" id="carColor" placeholder="White" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required />
                                </div>
                                <div>
                                    <label htmlFor="carModal" className="block  text-sm font-medium text-gray-900">Car Modal</label>
                                    <input type="text"
                                        onChange={handleInput}
                                        value={inputs.carModal}
                                        name="carModal" id="carModal" placeholder="Honda" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required />
                                </div>

                                <button type="submit"
                                    disabled={submitLoading} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center outline-none relative flex flex-row justify-center items-center gap-2 ${submitLoading ? 'opacity-50 cursor-wait hover:bg-blue-500 bg-blue-500' : ''
                                        }`}> {submitLoading ? (
                                            <>
                                                <span>Updating...</span>
                                                <ImSpinner9 className="animate-spin" />
                                            </>
                                        ) : (
                                            'Update Car'
                                        )}</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>;
};

export default EditCar;
