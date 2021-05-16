import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"

import { currentUserReducer } from "./currentUser"
import { currentCartReducer } from "./currentCart"
import { currentCartItemsReducer } from "./currentCartItems"
import { yearsReducer } from "./years"
import { countriesReducer } from "./countries"
import { typesReducer } from "./types"

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: {
    currentUser: currentUserReducer,
    currentCart: currentCartReducer,
    currentCartItems: currentCartItemsReducer,
    years: yearsReducer,
    countries: countriesReducer,
    types: typesReducer,
  },
})

export default store