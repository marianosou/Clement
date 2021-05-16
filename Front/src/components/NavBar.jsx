import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../store/currentUser"
import { loadStoreCart } from "../store/currentCart"
import { clearStoreCart } from "../store/currentCartItems"
import CategoryDropdown from "./CategoryDropdown"

const NavBar = () => {
  const currentCartItems = useSelector((state) => state.currentCartItems)
  const currentUser = useSelector((state) => state.currentUser)
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const token = localStorage.getItem("token")

  const handleChange = function (evt) {
    setSearchQuery(evt.target.value)
  }

  const handleSubmit = function (event) {
    event.preventDefault()
    setSearchQuery("")
    history.push("/search?q=" + searchQuery)
  }

  const handleLogout = function (event) {
    localStorage.removeItem("token")
    dispatch(getCurrentUser(""))
    dispatch(loadStoreCart("loading"))
    dispatch(clearStoreCart())
    history.push("/")
  }

  return (
    <div className="navbar-container">
      <div className="navbar-first-row-container">
        <div className="navbar-first-row">
          <div className="logo-container">
            <Link to="/">
              <div className="logo">Clement</div>
            </Link>
            <div className="logo-tagline">online wine shop</div>
          </div>
          <div className="search-and-log-in">
            <div className="search">
              {/* <img className="search-icon" src="icons/search.png"></img> */}
              {currentUser.isAdmin ? (
                <div className="navbar-admin-control-panel">
                  Admin Control Panel
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder="search"
                    value={searchQuery}
                  />
                </form>
              )}
            </div>
            {token ? (
              <div className="logged-in">
                {currentUser.isAdmin ? null : (
                  <Link to="/cart">
                    <button>Cart</button>
                  </Link>
                )}
                {!currentUser.isAdmin && currentCartItems.length ? (
                  <div className="cart-quantity">
                    {currentCartItems.reduce(
                      (accumulator, currentValue) =>
                        accumulator + Number(currentValue.quantity),
                      0
                    )}
                  </div>
                ) : null}
                {currentUser.isAdmin ? null : (
                  <Link to="/history">
                    <button>Orders</button>
                  </Link>
                )}
                <button onClick={handleLogout}>Log Out</button>
              </div>
            ) : (
              <div className="not-logged-in">
                {/* <Link to="/cart">
                  <button>Cart</button>
                </Link>
                {localItems ? (
                  <div className="cart-quantity">
                    {localItems.reduce(
                      (accumulator, currentValue) =>
                        accumulator + Number(currentValue.quantity),
                      0
                    )}
                  </div>
                ) : null} */}
                <Link to="/cart">
                  <button>Cart</button>
                </Link>
                {currentCartItems.length ? (
                  <div className="cart-quantity">
                    {currentCartItems.reduce(
                      (accumulator, currentValue) =>
                        accumulator + Number(currentValue.quantity),
                      0
                    )}
                  </div>
                ) : null}
                <Link to="/login">
                  <button>Log In</button>
                </Link>
                <Link to="/register">
                  <button>Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <CategoryDropdown />
      <hr />
    </div>
  )
}

export default NavBar
