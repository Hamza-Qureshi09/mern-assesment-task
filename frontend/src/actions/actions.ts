"use server";

import { cookies } from "next/headers";

// verify my session
export async function verifyMe() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/v1/verifySession`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Cookie: `${cookies().toString()}`
        }
    })
    if (res.status === 200) {
        return { status: 200, data: await res.json() }
    }
    return { status: 401, msg: "failed" }
}


// read categories
export async function readCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/v1/readcarcategories`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
    })
    if (res.status === 200) {
        return { status: 200, data: await res.json() }
    }
    return { status: 400, msg: "failed", data: [] }
}
// delete cars
export async function deleteCategory(categoryId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/v1/deletecarcategory?carCategoryId=${categoryId}`, {
        credentials: 'include',
        cache: 'no-store',
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Cookie: `${cookies().toString()}`
        },

    })
    if (res.status === 200) {
        return { status: 200, data: await res.json() }
    }
    return { status: 400, msg: "failed", data: [] }
}

// read cars
export async function readCars() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/v1/readcars`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
    })
    if (res.status === 200) {
        return { status: 200, data: await res.json() }
    }
    return { status: 400, msg: "failed", data: [] }
}
export async function deleteCars(carId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/v1/deletecar?carId=${carId}`, {
        credentials: 'include',
        cache: 'no-store',
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Cookie: `${cookies().toString()}`
        },

    })
    if (res.status === 200) {
        return { status: 200, data: await res.json() }
    }
    return { status: 400, msg: "failed", data: [] }
}


// conversation
// all users for search
export async function SearchUsersFind(userInput: string) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/v1/allusers?username=${userInput}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Cookie: `${cookies().toString()}`
        }
    })
    if (res.status === 200) {
        return { status: 200, data: await res.json() }
    }
    return { status: 401, msg: "failed" }
}
