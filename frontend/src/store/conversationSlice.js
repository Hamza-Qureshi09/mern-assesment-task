import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ToggleSidebar: false,
    SearchAndStartConvModal: false,
}

export const appControls = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        ToggleSidebarControl: (state, action) => {
            state.ToggleSidebar = action.payload.newStatus
        },
        SearchAndStartConvModalControl: (state, action) => {
            state.SearchAndStartConvModal = action.payload.newStatus
        },
    },
})

// Action creators are generated for each case reducer function
export const { ToggleSidebarControl, SearchAndStartConvModalControl } = appControls.actions

export default appControls.reducer