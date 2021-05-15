import axios from "axios"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([])
  const currentUser = useSelector((state) => state.currentUser)

  React.useEffect(() => {
    if (currentUser)
      axios
        .get("/api/transactions/" + currentUser.id)
        .then(({ data }) => {
          data.reverse()
          setOrderHistory(data)
        })
        .catch((err) => console.log(err))
    return () => setOrderHistory([])
  }, [currentUser])

  return (
    <>
      {orderHistory.length > 0 ? (
        orderHistory.map((order, index) => (
          <div className="order-history-container">
            <div key={index}>
              <div className="order-history-single-order">
                <div className="order-history-title">
                  Order Date: {order.checkoutDate.slice(0, 10)}
                </div>
                {/* <hr /> */}
                <div className="order-history-address-and-payment">
                  <div className="order-history-address">
                    Shipping Address: {order.address.address},{" "}
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.zipCode}, {order.address.country}
                  </div>
                  {/* <hr/> */}
                  <div className="order-history-payment">
                    Payment Method: {order.payment.cardType},{" "}
                    {order.payment.hiddenNumber}, Expiration Date:{" "}
                    {order.payment.expirationMonth}/
                    {order.payment.expirationYear}
                  </div>
                </div>
                <hr />
                <div className="order-history-labels">
                  <div className="order-history-column-1">Item</div>
                  <div className="order-history-column-2">Price</div>
                  <div className="order-history-column-3">Quantity</div>
                  <div className="order-history-column-4">Sub-total</div>
                </div>
                <hr />
                {order.transaction_items.map((item, index) => (
                  <div key={index}>
                    <div className="order-history-single-item">
                      <div className="order-history-column-1">
                        <img
                          className="order-history-picture"
                          src={item.product.urlPicture}
                        ></img>
                        {item.product.name}
                      </div>
                      <div className="order-history-column-2">
                        ${item.product.price}
                      </div>
                      <div className="order-history-column-3">
                        {item.quantity}
                      </div>
                      <div className="order-history-column-4">
                        ${item.quantity * item.product.price}
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="order-history-total">
                  Order Total: $
                  {order.transaction_items.reduce(
                    (accumulator, item) =>
                      accumulator +
                      Number(item.product.price) * Number(item.quantity),
                    0
                  )}
                </div>
                <hr />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-page-container">
          <div className="empty-page-title">
            You Have No Orders Yet
            <Link to="/">
              <button>Continue Shopping</button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderHistory
