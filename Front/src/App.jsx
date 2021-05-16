import React, { useEffect } from "react"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer.jsx"
import Home from "./components/Home"
import SingleProduct from "./components/SingleProduct.jsx"
import SearchResults from "./components/SearchResults"
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import Cart from "./components/Cart.jsx"
import Checkout from "./components/Checkout.jsx"
import OrderHistory from "./components/OrderHistory.jsx"
import AdminProduct from "./components/AdminProduct.jsx"
import AdminUsers from "./components/AdminUsers.jsx"
import AdminCategories from "./components/AdminCategories.jsx"
import { useSelector, useDispatch } from "react-redux"
import { getCurrentUser } from "./store/currentUser"
import { loadStoreCart } from "./store/currentCart"
import { setTypes } from "./store/types"
import { setYears } from "./store/years"
import { setCountries } from "./store/countries"
import { loadStoreCartItems, clearStoreCart } from "./store/currentCartItems"
import { Route, Switch } from "react-router"
import axios from "axios"
import AdminProducts from "./components/AdminProducts"

const App = () => {
  const currentUser = useSelector((state) => state.currentUser)
  const currentCart = useSelector((state) => state.currentCart)
  const currentCartItems = useSelector((state) => state.currentCartItems)
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()

  useEffect(() => {
    if (!currentUser && token) {
      axios.get(`/api/users/private/${token}`).then((user) => {
        dispatch(
          getCurrentUser({ id: user.data.id, isAdmin: user.data.isAdmin })
        )
      })
    }
    let typesAxios = axios.get(`/api/categories/types`)
    let countriesAxios = axios.get(`/api/categories/countries`)
    let yearsAxios = axios.get(`/api/categories/years`)

    Promise.all([typesAxios, countriesAxios, yearsAxios]).then((values) => {
      dispatch(setTypes(values[0].data))
      dispatch(setCountries(values[1].data))
      dispatch(setYears(values[2].data))
    })
  }, [])

  useEffect(() => {
    if (currentUser && currentCart === "loading")
      axios
        .post("/api/transactions", {
          userId: currentUser.id,
        })
        .then((cart) => {
          dispatch(loadStoreCart({ id: cart.data.id }))
        })
  }, [currentUser])

  useEffect(() => {
    if (!currentUser && currentCartItems.length)
      localStorage.setItem("localStorageCart", JSON.stringify(currentCartItems))
  }, [currentCartItems])

  useEffect(() => {
    let localStorageItems = JSON.parse(localStorage.getItem("localStorageCart"))
    if (localStorageItems && localStorageItems.length)
      dispatch(loadStoreCartItems(localStorageItems))
  }, [])

  useEffect(() => {
    if (currentCart !== "loading") {
      let localStorageItems = JSON.parse(
        localStorage.getItem("localStorageCart")
      )
      if (localStorageItems && localStorageItems.length) {
        axios
          .post("/api/transactionitems/localstorage", {
            array: localStorageItems,
            transactionId: currentCart.id,
          })
          .then(() => {
            localStorage.removeItem("localStorageCart")
            axios
              .put("/api/transactionitems/load", {
                transactionId: currentCart.id,
              })
              .then((cartItems) => {
                dispatch(clearStoreCart())
                dispatch(loadStoreCartItems(cartItems.data))
              })
          })
      } else {
        axios
          .put("/api/transactionitems/load", {
            transactionId: currentCart.id,
          })
          .then((cartItems) => {
            dispatch(loadStoreCartItems(cartItems.data))
          })
      }
    }
  }, [currentCart])

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <Switch>
          <Route path="/admin/product/edit" render={() => <AdminProduct />} />
          <Route path="/admin/products" render={() => <AdminProducts />} />
          <Route path="/admin/users" render={() => <AdminUsers />} />
          <Route path="/admin/categories" render={() => <AdminCategories />} />
          <Route
            path="/products/:id"
            render={({ match }) => <SingleProduct match={match} />}
          />
          <Route
            path="/search"
            render={({ match }) => <SearchResults match={match} />}
          />
          <Route path="/register" render={() => <Register />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/cart" render={() => <Cart />} />
          <Route path="/checkout" render={() => <Checkout />} />
          <Route path="/history" render={() => <OrderHistory />} />
          <Route path="/" render={() => <Home />} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
