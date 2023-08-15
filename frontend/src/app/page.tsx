
import CarForm from "@/components/cars/CarForm"
import CarTable from "@/components/cars/CarTable"
import EditCar from "@/components/cars/EditCar"
import CategoryForm from "@/components/categories/CategoryForm"
import EditCategory from "@/components/categories/EditCategory"
import CategoryTable from "@/components/categories/categoryTable"
import LogoutUser from "@/components/shared/logoutUser"


export default async function Home() {

    return (
        <main className="flex min-h-screen flex-col  px-4">
            <h1 className="font-bold text-xl text-center my-4">MERN Assesment</h1>

            {/*  section 1*/}
            <div className=" flex flex-row flex-wrap gap-2 w-full p-2 justify-center items-start ">
                {/* 1 */}
                <CategoryForm />
                {/* 2 */}
                <CarForm />
            </div>
            {/*  section 2*/}
            <div className="mt-4 mb-10 flex flex-row flex-wrap gap-2 w-full bg-zinc-100 p-2 justify-center items-start ">
                {/* 1 */}
                <CategoryTable />
                {/* 2 */}
                <div className="bg-white drop-shadow-md lg:max-w-xl w-full max-w-full p-3 rounded-md">
                    <CarTable />
                </div>
            </div>
            {/* edit modals */}
            <div className="relative">
                <EditCategory />
                <EditCar />
            </div>
            {/* logout */}
           <div>
            <LogoutUser/>
           </div>
        </main>
    )
}
