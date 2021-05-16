import { createAction, createReducer } from '@reduxjs/toolkit'

export const setTypes = createAction('SET_TYPES');
export const editType = createAction('EDIT_TYPE');
export const addOneType = createAction('ADD_ONE_TYPE');

export const typesReducer = createReducer([], {
    [setTypes]: (state, action) => action.payload,
    [editType]: (state, action) => state.map((type) => {
      if (type.id !== action.payload.id){ 
        return type
    } else {
        return action.payload
      }
    }),
    [addOneType]: (state, action) => [...state, action.payload]
});