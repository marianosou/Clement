import React, { useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { clearStoreCart } from "../store/currentCartItems"
import { loadStoreCart } from "../store/currentCart"
import { validateLetters, validateNumbers } from "../../utils/methods"

const Checkout = () => {
  const currentCart = useSelector((state) => state.currentCart)
  const currentUser = useSelector((state) => state.currentUser)

  const [cards, setCards] = useState([])
  const [addresses, setAddresses] = useState([])

  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)

  const [selectedPayment, setSelectedPayment] = useState("")
  const [selectedAddress, setSelectedAddress] = useState("")

  const [fullName, setFullName] = useState("")
  const [cardType, setCardType] = useState("")
  const [ccNumber, setCCNumber] = useState("")
  const [secCode, setSecCode] = useState("")
  const [expirationMonth, setExpirationMonth] = useState("")
  const [expirationYear, setExpirationYear] = useState("")

  const [error, setError] = useState("")
  const [fullNameError, setFullNameError] = useState("")
  const [cardTypeError, setCardTypeError] = useState("")
  const [ccNumberError, setCcNumberError] = useState("")
  const [secCodeError, setSecCodeError] = useState("")
  const [expirationError, setExpirationError] = useState("")

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [zipCode, setZipCode] = useState("")

  const [addressError, setAddressError] = useState("")
  const [cityError, setCityError] = useState("")
  const [stateError, setStateError] = useState("")
  const [countryError, setCountryError] = useState("")
  const [zipCodeError, setZipCodeError] = useState("")

  const history = useHistory()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (currentUser)
      axios.get("/api/payments/" + currentUser.id).then((cards) => {
        setCards(cards.data)
      })
  }, [currentUser])

  React.useEffect(() => {
    if (currentUser)
      axios.get("/api/addresses/" + currentUser.id).then((address) => {
        setAddresses(address.data)
      })
  }, [currentUser])

  const handleTransactionSubmit = (event) => {
    event.preventDefault()
    let checkoutDate = new Date()
    axios
      .put("/api/transactions/" + currentCart.id, {
        checkoutDate,
        paymentId: selectedPayment,
        addressId: selectedAddress,
      })
      .then(() => {
        dispatch(clearStoreCart())
        return axios.post("/api/transactions", {
          userId: currentUser.id,
        })
      })
      .then((newTransaction) => {
        dispatch(loadStoreCart({ id: newTransaction.data.id }))
        history.push("/history")
      })
      .catch((error) => console.log(error))
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault()
    if (formValidationAddress()) {
      axios
        .post("/api/addresses/", {
          address,
          city,
          state,
          country,
          zipCode,
          userId: currentUser.id,
        })
        .then((newAddress) => {
          setAddresses([...addresses, newAddress.data])
          setAddress("")
          setCity("")
          setState("")
          setCountry("")
          setZipCode("")
          setShowAddressForm(false)
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    }
  }

  const handlePaymentSubmit = (event) => {
    event.preventDefault()
    if (formValidationCards()) {
      axios
        .post("/api/payments/", {
          fullName,
          cardType,
          ccNumber,
          secCode,
          expirationMonth,
          expirationYear,
          userId: currentUser.id,
        })
        .then((newPayment) => {
          setCards([...cards, newPayment.data])
          setFullName("")
          setCardType("")
          setCCNumber("")
          setSecCode("")
          setExpirationMonth("")
          setExpirationYear("")
          setShowPaymentForm(false)
        })
        .catch((error) => {
          setError(error.response.data)
        })
    }
  }

  const removePayment = function ({ id }) {
    axios
      .delete("/api/payments/" + id)
      .then(() => setCards(cards.filter((card) => card.id !== id)))
  }

  const removeAddress = function ({ id }) {
    axios
      .delete("/api/addresses/" + id)
      .then(() =>
        setAddresses(addresses.filter((address) => address.id !== id))
      )
  }

  const formValidationCards = () => {
    setCcNumberError("")
    setCardTypeError("")
    setFullNameError("")
    setSecCodeError("")
    setExpirationError("")
    const elem = document.getElementsByClassName("payment-form")[0]
    for (let i = 0; i < elem.length; i++) { elem[i].classList.remove("invalid-sign-up-or-log-in") }
    if (!ccNumber) {
      elem[0].className = "invalid-sign-up-or-log-in", setCcNumberError("A Credit Card Number is Required")
    }
    if (!cardType) {
      elem[1].className = "invalid-sign-up-or-log-in", setCardTypeError("A Card Type is Required")
    }
    if (!fullName) {
      elem[2].className = "invalid-sign-up-or-log-in", setFullNameError("Name on Card is Required")
    }
    if (!secCode) {
      elem[3].className = "invalid-sign-up-or-log-in", setSecCodeError("Security Code is Required")
    }
    if (!expirationMonth || !expirationYear) {
      elem[4].className = "invalid-sign-up-or-log-in", elem[5].className = "invalid-sign-up-or-log-in", setExpirationError("Expiration Date is Required")
    }
    return ((ccNumber && cardType) && (fullName && secCode)) && (expirationMonth && expirationYear)
  }

  const formValidationAddress = () => {
    setAddressError("")
    setCityError("")
    setStateError("")
    setCountryError("")
    setZipCodeError("")
    const elem = document.getElementsByClassName("address-form")[0]
    for (let i = 0; i < elem.length; i++) { elem[i].classList.remove("invalid-sign-up-or-log-in") }
    if (!address) {
      elem[0].className = "invalid-sign-up-or-log-in", setAddressError("An Address is Required")
    }
    if (!city) {
      elem[1].className = "invalid-sign-up-or-log-in", setCityError("A City is Required")
    }
    if (!state) {
      elem[2].className = "invalid-sign-up-or-log-in", setStateError("A State is Required")
    }
    if (!zipCode) {
      elem[3].className = "invalid-sign-up-or-log-in", setZipCodeError("A Zip Code is Required")
    }
    if (!country) {
      elem[4].className = "invalid-sign-up-or-log-in", setCountryError("A Country is Required")
    }
    return ((address && city) && (state && country)) && zipCode
  }
  const Error = () => (
    <div className="sign-up-or-log-in-error">
      {error}
    </div>
  )

  return (
    <>
      <div className="checkout-container">
        <div className="payment-container">
          <div className="payment-or-address-container">
            <h2 className="payment-or-address-title">Select Payment Method</h2>
            <hr />
            {cards.length > 0 &&
              cards.map((card, index) => (
                <div key={index}>
                  <div className="card-or-address-option">
                    <div
                      className="card-or-address-input-and-name"
                      value={card.id}>
                      <input
                        name="card"
                        type="radio"
                        value={card.id}
                        onChange={(event) =>
                          setSelectedPayment(event.target.value)
                        }
                      />
                      <div>
                        {card.cardType + ", " + card.hiddenNumber}
                        <div>
                          {"Expiration date: " +
                            card.expirationMonth +
                            "/" +
                            card.expirationYear}
                        </div>
                      </div>
                    </div>
                    <img
                      className="checkout-delete-icon"
                      src="icons/delete.png"
                      onClick={() => removePayment(card)}
                    ></img>
                  </div>
                  <hr />
                </div>
              ))}
            {showPaymentForm ? null : (
              <div>
                <button onClick={() => setShowPaymentForm(true)}>
                  Add New Payment Method
                </button>
              </div>
            )}
          </div>
          {showPaymentForm ? (
            <>
              <div className="payment-or-address-container">
                <h2 className="payment-or-address-title">Add Payment Method</h2>
                <form
                  className="payment-form"
                  onSubmit={handlePaymentSubmit}
                >
                  <label>Credit Card Number</label>
                  <input
                    type="text"
                    name="ccNumber"
                    onChange={(event) => validateNumbers(event.target.value, 16) ? setCCNumber(event.target.value) : ""}
                    value={ccNumber}
                  />
                  <div className="sign-up-or-log-in-login-error">{ccNumberError}</div>
                  <label>Type</label>
                  <input
                    type="text"
                    name="cardType"
                    onChange={(event) => setCardType(event.target.value)}
                  />
                  <div className="sign-up-or-log-in-login-error">{cardTypeError}</div>
                  <label>Name on Card</label>
                  <input
                    type="text"
                    name="fullName"
                    onChange={(event) => validateLetters(event.target.value, 16) ? setFullName(event.target.value) : ""}
                    value={fullName}
                  />
                  <div className="sign-up-or-log-in-login-error">{fullNameError}</div>
                  <div className="security-code-and-expiration-date">
                    <div className="security-code">
                      <label>Security Code</label>
                      <input
                        type="text"
                        name="secCode"
                        onChange={(event) => validateNumbers(event.target.value, 4) ? setSecCode(event.target.value) : ""}
                        value={secCode}
                      />
                      <div className="sign-up-or-log-in-login-error">{secCodeError}</div>
                    </div>
                    <div>
                      <label>Expiration Date</label>
                      <div className="expiration-date">
                        <input
                          type="text"
                          name="expirationMonth"
                          onChange={(event) => validateNumbers(event.target.value, 2) ? setExpirationMonth(event.target.value) : ""}
                          value={expirationMonth}
                        />
                        <input
                          type="text"
                          name="expirationYear"
                          onChange={(event) => validateNumbers(event.target.value, 4) ? setExpirationYear(event.target.value) : ""}
                          value={expirationYear}
                        />
                      </div>
                      <div className="sign-up-or-log-in-login-error">{expirationError}</div>
                    </div>
                  </div>
                  <button>Save Payment Method</button>
                </form>
                {error && <Error />}
              </div>
            </>
          ) : null}
        </div>
        <div className="address-container">
          <div className="payment-or-address-container">
            <h2 className="payment-or-address-title">
              Select Shipping Address
            </h2>
            <hr />
            {addresses.length > 0 &&
              addresses.map((address, index) => (
                <div
                  key={index}
                >
                  <div className="card-or-address-option"

                  >

                    <div
                      className="card-or-address-input-and-name"
                      value={address.id}
                    >
                      <input
                        name="address"
                        type="radio"
                        value={address.id}
                        onChange={(event) =>
                          setSelectedAddress(event.target.value)
                        }
                      />
                      <div>
                        <div>{address.address}</div>
                        <div>
                          {address.city +
                            ", " +
                            address.state +
                            ", " +
                            address.zipCode +
                            ", " +
                            address.country}
                        </div>
                      </div>
                    </div>
                    <img
                      className="checkout-delete-icon"
                      src="icons/delete.png"
                      onClick={() => removeAddress(address)}
                    ></img>
                  </div>
                  <hr />
                </div>
              ))}
            {showAddressForm ? null : (
              <div>
                <button onClick={() => setShowAddressForm(true)}>
                  Add New Address
                </button>
              </div>
            )}
          </div>
          {showAddressForm ? (
            <>
              <div className="payment-or-address-container">
                <h2 className="payment-or-address-title">Add Address</h2>
                <form
                  className="address-form"
                  onSubmit={handleAddressSubmit}
                >
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                  <div className="sign-up-or-log-in-login-error">{addressError}</div>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    onChange={(event) => setCity(event.target.value)}
                  />
                  <div className="sign-up-or-log-in-login-error">{cityError}</div>
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    onChange={(event) => setState(event.target.value)}
                  />
                  <div className="sign-up-or-log-in-login-error">{stateError}</div>
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zip_code"
                    onChange={(event) => setZipCode(event.target.value)}
                  />
                  <div className="sign-up-or-log-in-login-error">{zipCodeError}</div>
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    onChange={(event) => setCountry(event.target.value)}
                  />
                  <div className="sign-up-or-log-in-login-error">{countryError}</div>
                  <button>Save Address</button>
                </form>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="checkout-submit-container">
        {selectedPayment && selectedAddress ? <button onClick={handleTransactionSubmit}>Confirm Order</button> : null}
      </div>
    </>
  )
}

export default Checkout
