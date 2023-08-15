"use client"

import { CreateCategoryRoute } from '@/http';
import { CategoryHint } from '@/store/controls';
import { AxiosError } from 'axios';
import { revalidateTag } from 'next/cache';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';

interface ICategoryFormProps {
}

const CategoryForm: React.FunctionComponent<ICategoryFormProps> = (props) => {
    const [submitLoading, setsubmitLoading] = React.useState(false)
    const [carCategory, setcarCategory] = React.useState('')
    const { caregoryHint } = useSelector((state: any) => state.controls)
    const dispatch = useDispatch()
    // create car category
    const createCategory = async () => {
        if (!carCategory) {
            toast.error("category field is empty!", { position: 'top-center', duration: 2000 })
            return
        }
        try {
            setsubmitLoading(true)
            const request = await CreateCategoryRoute({
                carCategory
            })

            if (request?.status === 201) {
                const { data } = request
                setTimeout(() => {
                    setsubmitLoading(false)
                }, 2000);
                toast.success("Successfully created!", { duration: 2000, position: 'top-center' })
                setcarCategory('')
                dispatch(CategoryHint({
                    Hint: !caregoryHint
                }))
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
            <div className="mb-6">
                <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Category</label>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setcarCategory(e.target.value)} value={carCategory} id="categoryName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none " placeholder="Bus..." required />
            </div>
            <button type="submit"
                onClick={createCategory}
                disabled={submitLoading} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center outline-none relative flex flex-row justify-center items-center gap-2 ${submitLoading ? 'opacity-50 cursor-wait hover:bg-blue-500 bg-blue-500' : ''
                    }`}> {submitLoading ? (
                        <>
                            <span>Creating...</span>
                            <ImSpinner9 className="animate-spin" />
                        </>
                    ) : (
                        'Create Car Category'
                    )}</button>
        </div>
    </>;
};

export default CategoryForm;
