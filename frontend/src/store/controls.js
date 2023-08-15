import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    authorization: false,
    activation: false,
    userDetails: {},
    registryCredentials: {},
    caregoryHint: false,
    categories: [],
    carHint: false,
    editCategoryModalToggle: false,
    editCategoryRecord: {},
    editCarModalToggle: false,
    editCarRecord: {},
}

export const appControls = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        userRegistration: (state, actions) => {
            const { registryUserDetails } = actions.payload
            state.registryCredentials = registryUserDetails
        },
        AuthControlEntry: (state, actions) => {
            const { activation, authorization, userDetails } = actions.payload
            state.authorization = authorization,
                state.activation = activation,
                state.userDetails = userDetails
        },
        CategoryHint: (state, actions) => {
            const { Hint } = actions.payload
            state.caregoryHint = Hint
        },
        AllCategories: (state, actions) => {
            const { categories } = actions.payload
            state.categories = categories
        },
        CarHint: (state, actions) => {
            const { Hint } = actions.payload
            state.carHint = Hint
        },
        EditCategoryModalToggle: (state, actions) => {
            const { Status } = actions.payload
            state.editCategoryModalToggle = Status
        },
        EditCategorRecord: (state, actions) => {
            const { Record } = actions.payload
            state.editCategoryRecord = Record
        },
        EditCarModalToggle: (state, actions) => {
            const { Status } = actions.payload
            state.editCarModalToggle = Status
        },
        EditCarRecord: (state, actions) => {
            const { Record } = actions.payload
            state.editCarRecord = Record
        }
    },
})

// Action creators are generated for each case reducer function
export const { AuthControlEntry, userRegistration, CategoryHint, AllCategories, CarHint, EditCategoryModalToggle, EditCategorRecord, EditCarModalToggle, EditCarRecord } = appControls.actions

export default appControls.reducer