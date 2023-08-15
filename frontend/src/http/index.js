import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json',
    },
    withCredentials: true
})


// @MODE: HTTP Requests
// @Description: Auth Routes
export const RegistrationRoute = (data) => { return api.post("/api/v1/register", data) }
export const VerifyOTP = (data) => { return api.post("/api/v1/otpverify", data) }
export const LoginRoute = (data) => { return api.post("/api/v1/login", data) }

export const LogoutUser = () => { return api.get("/api/v1/logout") }

// @MODE: HTTP Requests
// @Description: car category Routes
export const CreateCategoryRoute = (data) => { return api.post("/api/v1/createcarcategory", data) }
export const GetCarCategoriesRoute = (data) => { return api.get("/api/v1/readcarcategories", data) }
export const UpdateCarCategoriesRoute = (data) => { return api.put("/api/v1/updatecarcategory", data) }
// export const DeleteCarCategoriesRoute = (categoryID) => {
//     return api.delete(`/api/v1/deletecarcategory?carCategoryId=${categoryID}`, { carCategoryId: categoryID });
// };

// @MODE: HTTP Requests
// @Description: car Routes
export const CreateCarRoute = (data) => { return api.post("/api/v1/createcar", data) }
export const GetCarsRoute = (data) => { return api.get("/api/v1/readcars", data) }
export const UpdateCarRoute = (data) => { return api.put("/api/v1/updatecar", data) }
// export const DeleteCarRoute = (data) => { return api.delete("/api/v1/deletecar", data) }

export default api;