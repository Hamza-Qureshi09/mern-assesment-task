"use client"

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from "react-icons/md";
import { CarHint, CategoryHint, EditCategorRecord, EditCategoryModalToggle } from '@/store/controls';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { UpdateCarCategoriesRoute } from '@/http';
import { AxiosError } from 'axios';

interface IEditCategoryProps {
}

const EditCategory: React.FunctionComponent<IEditCategoryProps> = (props) => {
    const dispatch = useDispatch()
    const { editCategoryRecord, editCategoryModalToggle, caregoryHint, carHint } = useSelector((state: any) => state.controls)
    const [submitLoading, setsubmitLoading] = React.useState(false)
    const [category, setcategory] = React.useState('')

    const CloseModal = () => {
        dispatch(EditCategorRecord({
            Record: {}
        }))
        dispatch(EditCategoryModalToggle({
            Status: false
        }))
        setcategory('')
    }

    const editCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!category || !editCategoryRecord._id) {
            toast.error("incomplete information try again!", { position: 'top-center', duration: 2000 })
            return
        }
        try {
            setsubmitLoading(true)
            const request = await UpdateCarCategoriesRoute({
                carCategory: category,
                carCategoryId: editCategoryRecord._id
            })

            if (request?.status === 200) {
                const { data } = request
                toast.success("Successfully updated!", { duration: 2000, position: 'top-center' })
                setcategory('')
                dispatch(CategoryHint({
                    Hint: !caregoryHint
                }))
                dispatch(CarHint({
                    Hint: !carHint
                }))
                dispatch(EditCategorRecord({
                    Record: {}
                }))
                dispatch(EditCategoryModalToggle({
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
        setcategory(editCategoryRecord.carCategory)
    }, [editCategoryModalToggle])
    return <>
        {editCategoryModalToggle && <div className=" before:absolute before:backdrop-blur-sm before:backdrop-brightness-50 before:h-screen before:w-full flex flex-col justify-center items-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 p-4 w-full md:inset-0 h-modal md:h-full z-[100]">
            <div className="relative w-full max-w-md h-screen  flex flex-col justify-center   md:h-auto">

                <div className="relative bg-white rounded-lg shadow ">
                    <button type="button" className="absolute top-3 right-2.5 ">
                        <MdClose className='text-2xl font-bold' onClick={CloseModal} />
                    </button>
                    <form onSubmit={editCategory}>
                        <div className="py-6 px-7 lg:px-8 font-Poppins">
                            <h3 className="mb-4 text-xl  text-gray-900 font-Alaktra font-semibold">Edit Car Category</h3>

                            <div>
                                <label htmlFor="Degree" className="block  text-sm font-medium text-gray-900">Category</label>
                                <input type="text"
                                    onChange={(e) => setcategory(e.target.value.trim())}
                                    value={category}
                                    name="Degree" id="Degree" placeholder="Computer Science" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required />
                            </div>

                            <button type="submit"
                                disabled={submitLoading} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center outline-none relative flex flex-row justify-center items-center gap-2 ${submitLoading ? 'opacity-50 cursor-wait hover:bg-blue-500 bg-blue-500' : ''
                                    }`}> {submitLoading ? (
                                        <>
                                            <span>Updating...</span>
                                            <ImSpinner9 className="animate-spin" />
                                        </>
                                    ) : (
                                        'Update Car Category'
                                    )}</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
        }
    </>;
};

export default EditCategory;
