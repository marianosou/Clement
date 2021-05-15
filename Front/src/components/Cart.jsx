import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {  removeFromStoreCart, changeQuantityInStoreCart,
} from "../store/currentCartItems"

const Cart = () => {
  let currentCartItems = useSelector((state) => state.currentCartItems)
  const [total, setTotal] = useState(0)
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setTotal(
      currentCartItems &&
      currentCartItems.reduce(
        (accumulator, currentValue) =>
          accumulator +
          Number(currentValue.price) * Number(currentValue.quantity),
        0
      )
    )
  }, [currentCartItems])

  const removeFromCart = function (cartItem) {
    if (!currentUser)
      dispatch(removeFromStoreCart({ productId: cartItem.productId }))
    else axios.delete("/api/transactionitems/" + cartItem.id).then(() =>
      dispatch(
        removeFromStoreCart({
          productId: cartItem.productId,
        })
      )
    )
  }

  const changeQuantity = function (cartItem, quantity) {
    if (quantity > 0) {
      quantity = Number(quantity)
      let { id, productId } = cartItem
      if (quantity === 0) removeFromCart(cartItem)
      if (quantity > 0) {
        if (!currentUser)
          dispatch(
            changeQuantityInStoreCart({
              productId,
              quantity,
            })
          )
        else
          axios
            .put("/api/transactionitems/quantity", {
              id: id,
              quantity: quantity,
            })
            .then(() =>
              dispatch(
                changeQuantityInStoreCart({
                  productId,
                  quantity,
                })
              )
            )
      }
    }
    else {
      quantity = 1
    }
  }

  // useInput que quizás sirve para los items del carrito

  const useInput = (name, incomingValue) => {
    const [value, setValue] = useState(incomingValue);

    const onChange = ({ target: { value } }) => {
      setFormError("")
      setValue(value)
    };

    return { value, onChange, name };
  };

  return (
    <>
      {currentCartItems && currentCartItems.length ? (
        <div className="cart-container">
          <div className="cart-title">Your Shopping Cart</div>
          <hr />
          <div className="cart-column-labels">
            <div className="column-1">Item</div>
            <div className="column-2">Price</div>
            <div className="column-3">Quantity</div>
            <div className="column-4">Sub-total</div>
          </div>
          <hr />
          {currentCartItems.map((cartItem, index) => (
            <div key={index}>
              <div className="cart-item">
                <div className="column-1">
                  <img
                    className="cart-product-picture"
                    src={cartItem.urlPicture}
                  />
                  {cartItem.name}
                </div>
                <div className="column-2">{"$" + cartItem.price}</div>
                <div className="column-3">
                  <input
                    type="number"
                    onKeyDown={(event)=>(event.key===38 || event.key===40) ? updateValue(event): event.preventDefault()}
                    onChange={(event) => changeQuantity(cartItem, event.target.value)}
                    value={cartItem.quantity}
                  />
                  <img
                    onClick={() => removeFromCart(cartItem)}
                    className="cart-delete-icon"
                    src="icons/delete.png"
                  ></img>
                </div>
                <div className="column-4">
                  {"$" + cartItem.price * cartItem.quantity}
                </div>
              </div>
              <hr />
            </div>
          ))}
          <div className="cart-total">
            <div className="cart-total-amount">Order Total: ${total}</div>
            <Link to={currentUser ? "/checkout" : "/login"}>
              <button>Checkout</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="empty-page-container">
          <div className="empty-page-title">
            Your Cart Is Empty
            <Link to="/">
              <button>Continue Shopping</button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
