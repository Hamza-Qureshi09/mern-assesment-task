'use client'

import { deleteCategory, readCategories } from '@/actions/actions';
import { AllCategories, CategoryHint, EditCategorRecord, EditCategoryModalToggle } from '@/store/controls';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ICategoryTableProps {
    // categories: []
}

const CategoryTable: React.FunctionComponent<ICategoryTableProps> = (props: any) => {
    const dispatch = useDispatch()
    const [categories, setcategories] = React.useState([])
    const { caregoryHint } = useSelector((state: any) => state.controls)
    const DeleteCategory = async (categoryID: string) => {
        await deleteCategory(categoryID)
        dispatch(CategoryHint({
            Hint: !caregoryHint
        }))
    }
    const openEditCategoryModal = (category: any) => {

        dispatch(EditCategorRecord({
            Record: category
        }))
        dispatch(EditCategoryModalToggle({
            Status: true
        }))

    }
    React.useEffect(() => {
        const fetchCategories = async () => {
            const res = await readCategories()
            if (res.status === 200) {
                const { carCategories } = res.data
                setcategories(carCategories)
                dispatch(AllCategories({
                    categories: carCategories
                }))
            }
        }
        fetchCategories()
    }, [caregoryHint])

    return <>
        <div className="bg-white drop-shadow-md lg:max-w-md w-full max-w-full p-3 rounded-md">
            <h1 className="font-semibold mb-2 text-xl">Car Categories List</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-64 scrollbarwork">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                car Category
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length >= 1 ?
                            categories.map((val: any, index: number) => {
                                return <tr key={index} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {val.carCategory}"
                                    </th>
                                    <td className="px-6 py-4 space-x-2">
                                        <button onClick={() => openEditCategoryModal(val)} className="font-medium text-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => DeleteCategory(val._id)} className="font-medium text-rose-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            })
                            : <tr>
                                <td colSpan={2}>No Category Found!</td>
                            </tr>}


                    </tbody>
                </table>
            </div>
        </div>
    </>;
};

export default CategoryTable;
