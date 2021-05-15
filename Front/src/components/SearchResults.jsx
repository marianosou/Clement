import React, { useState } from "react"
import axios from "axios"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToStoreCart } from "../store/currentCartItems"

const SearchResults = (props) => {
  const [products, setProducts] = useState("loading")
  const currentCart = useSelector((state) => state.currentCart)
  const currentUser = useSelector((state) => state.currentUser)
  const currentCartItems = useSelector((state) => state.currentCartItems)
  const dispatch = useDispatch()
  const history = useHistory()
  const [title, setTitle] = useState("")

  const search = useLocation().search
  const q = new URLSearchParams(search).get("q")
  const m = new URLSearchParams(search).get("m")
  React.useEffect(() => {
    axios
      .get(`/api/products/search?q=${q}&m=${m}`)
      .then(({ data }) => {
        setProducts(data.products)
        setTitle(data.model)
      })
      .catch((err) => console.log(err))
    return () => setProducts("loading")
  }, [q, m])

  const addToCart = function (product) {
    if (!currentUser) {
      let existingItem = currentCartItems.find(
        (cartItem) => cartItem.productId === product.id
      )
      if (existingItem) product.quantity = existingItem.quantity + 1
      dispatch(
        addToStoreCart({
          name: product.name,
          urlPicture: product.urlPicture,
          price: product.price,
          quantity: product.quantity || 1,
          productId: product.id,
        })
      )
    } else
      axios
        .post("/api/transactionitems", {
          transactionId: currentCart.id,
          productId: product.id,
          quantity: 1,
        })
        .then((transactionItem) =>
          dispatch(
            addToStoreCart({
              name: product.name,
              urlPicture: product.urlPicture,
              price: product.price,
              quantity: transactionItem.data.quantity,
              productId: product.id,
              id: transactionItem.data.id,
            })
          )
        )
  }

  return (
    <>
      {products === "loading" ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="results-title">{title}</div>
          <div className="results-container">
            {products.map((product, index) => (
              <div key={index} className="single-result">
                <div className="picture-container">
                  <Link to={`/products/${product.id}`}>
                    <img
                      className="single-result-picture"
                      src={product.urlPicture}
                    />
                  </Link>
                </div>
                <hr />
                <div className="single-result-specs">
                  <div className="single-result-name-and-brand">
                    <div className="single-result-name">{product.name}</div>
                    <div className="single-result-brand">{product.brand}</div>
                  </div>
                  <hr />
                  <div className="single-result-price">
                    {"$" + product.price}
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="add-to-cart-results"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default SearchResults
