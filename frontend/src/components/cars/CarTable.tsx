"use client"

import { deleteCars, readCars } from '@/actions/actions';
import { CarHint, EditCarModalToggle, EditCarRecord } from '@/store/controls';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ICarTableProps {
}

const CarTable: React.FunctionComponent<ICarTableProps> = (props) => {
    const dispatch = useDispatch()
    const [cars, setCars] = React.useState([])
    const { carHint } = useSelector((state: any) => state.controls)
    const DeleteCar = async (carID: string) => {
        await deleteCars(carID)
        dispatch(CarHint({
            Hint: !carHint
        }))
    }
    const openEditCarModal = (car: any) => {

        dispatch(EditCarRecord({
            Record: car
        }))
        dispatch(EditCarModalToggle({
            Status: true
        }))

    }
    React.useEffect(() => {
        const fetchCategories = async () => {
            const res = await readCars()
            if (res.status === 200) {
                const { allCars } = res.data
                setCars(allCars)
            }
        }
        fetchCategories()
    }, [carHint])
    return <>
        <div className="bg-white drop-shadow-md lg:max-w-xl w-full max-w-full p-3 rounded-md">
            <h1 className="font-semibold mb-2 text-xl">Car Lists</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-64 scrollbarwork">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                car Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                car Modal
                            </th>
                            <th scope="col" className="px-6 py-3">
                                car RegNo.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                car Color
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.length >= 1 ?
                            cars.map((val: any, index: number) => {
                                const { carCategory } = val?.carCategory
                                return <tr key={index} className="bg-white border-b">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {carCategory}
                                    </th>
                                    <td className='px-6 py-4'>
                                        {val.carModal}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {val.carRegno}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {val.carColor}
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button onClick={() => openEditCarModal(val)} className="font-medium text-blue-600 hover:underline">Edit</button>
                                        <button onClick={() => DeleteCar(val._id)} className="font-medium text-rose-600 dark:text-blue-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            })
                            : <tr>
                                <td colSpan={2}>No Car Found!</td>
                            </tr>}


                    </tbody>
                </table>
            </div>
            {/* <div className="flex flex-col items-end">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">10</span> of <span className="font-semibold text-gray-900 dark:text-white">100</span> Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Prev
                    </button>
                    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                    </button>
                </div>
            </div> */}
        </div>
    </>;
};

export default CarTable;
