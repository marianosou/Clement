import { createAction, createReducer } from "@reduxjs/toolkit"

export const loadStoreCartItems = createAction("LOAD_STORE_CART_ITEMS")
export const addToStoreCart = createAction("ADD_TO_STORE_CART")
export const removeFromStoreCart = createAction("REMOVE_FROM_STORE_CART")
export const clearStoreCart = createAction("CLEAR_STORE_CART")
export const changeQuantityInStoreCart = createAction(
  "CHANGE_QUANTITY_IN_STORE_CART"
)

export const currentCartItemsReducer = createReducer([], {
  [loadStoreCartItems]: (state, action) => action.payload,
  [addToStoreCart]: (state, action) => {
    let filteredState = state.filter(
      (cartItem) => cartItem.productId !== action.payload.productId
    )
    return [...filteredState, action.payload]
  },
  [removeFromStoreCart]: (state, action) =>
    state.filter((cartItem) => cartItem.productId !== action.payload.productId),
  [clearStoreCart]: (state, action) => [],
  [changeQuantityInStoreCart]: (state, action) => {
    state.map((cartItem) => {
      if (cartItem.productId !== action.payload.productId) return cartItem
      else {
        cartItem.quantity = action.payload.quantity
        return cartItem
      }
    })
  }
  ,
});