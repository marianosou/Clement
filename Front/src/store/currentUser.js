import { createAction, createReducer } from '@reduxjs/toolkit'

export const getCurrentUser = createAction('GET_CURRENT_USER')

export const currentUserReducer = createReducer("", {
    [getCurrentUser]: (state, action) => action.payload,
})