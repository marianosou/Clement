import { createAction, createReducer } from '@reduxjs/toolkit'

export const setCountries = createAction('SET_COUNTRIES');
export const editCountry = createAction('EDIT_COUNTRY');
export const addOneCountry = createAction('ADD_ONE_COUNTRY');

export const countriesReducer = createReducer([], {
    [setCountries]: (state, action) => action.payload,
    [editCountry]: (state, action) => state.map((country) => {
        if (country.id !== action.payload.id){ 
          return country
      } else {
          return action.payload
        }
      }),
      [addOneCountry]: (state, action) => [...state, action.payload]
});