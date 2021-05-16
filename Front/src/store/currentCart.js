import { createAction, createReducer } from "@reduxjs/toolkit"

export const loadStoreCart = createAction("LOAD_STORE_CART")

export const currentCartReducer = createReducer("loading", {
  [loadStoreCart]: (state, action) => action.payload,
})