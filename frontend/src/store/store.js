import { configureStore } from '@reduxjs/toolkit'
import controls from './controls'
import conversationSlice from './conversationSlice'

export const store = configureStore({
    reducer: {
        controls,
        conversationSlice
    },
    devTools: 'development'
    // devTools: process.env.NEXT_PUBLIC_TOOLKIT_MODE ||'production'
})
