import { createAction, createReducer } from '@reduxjs/toolkit'

export const setYears = createAction('SET_YEARS');
export const editYear = createAction('EDIT_YEAR');
export const addOneYear = createAction('ADD_ONE_YEAR');

export const yearsReducer = createReducer("", {
    [setYears]: (state, action) => action.payload,
    [editYear]: (state, action) => state.map((year) => {
        if (year.id !== action.payload.id){ 
          return year
      } else {
          return action.payload
        }
      }),
      [addOneYear]: (state, action) => [...state, action.payload]
});