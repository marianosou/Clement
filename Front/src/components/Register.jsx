import React, { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "../store/currentUser"
import { useHistory } from "react-router-dom"
import { validateEmail } from "../../utils/methods"

const NewUser = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [nameError, setNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showButtonSpinner, setShowButtonSpinner] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = function (event) {
    event.preventDefault()
    if (formValidation()) {
      setShowButtonSpinner(true)
      axios
        .post("/api/users/register", {
          email,
          name,
          lastName,
          password,
        })
        .then((newUser) => {
          localStorage.setItem("token", newUser.data.token)
          dispatch(
            getCurrentUser({
              id: newUser.data.user.id,
              isAdmin: newUser.data.user.isAdmin,
            })
          )
          if (newUser.data.user.isAdmin) history.push("/")
          else history.goBack()
        })
        .catch((error) => {
          setShowButtonSpinner(false)
          setError(error.response.data)
        })
    }
  }

  const formValidation = () => {
    setEmailError("")
    setNameError("")
    setLastNameError("")
    setPasswordError("")
    const elem = document.getElementsByTagName("Input")
    for (let i = 1; i < elem.length; i++) { elem[i].classList.remove("invalid-sign-up-or-log-in") }
    if (!validateEmail(email)) {
      elem[1].className = "invalid-sign-up-or-log-in", setEmailError("A valid Email is Required")
    }
    if (!name) {
      elem[2].className = "invalid-sign-up-or-log-in", setNameError("First Name is Required")
    }
    if (!lastName) {
      elem[3].className = "invalid-sign-up-or-log-in", setLastNameError("Last Name is Required")
    }
    if (!password) {
      elem[4].className = "invalid-sign-up-or-log-in", setPasswordError("A password is Required")
    }
    return (validateEmail(email) && name) && (name && password)
  }

  const Error = () => (
    <div className="sign-up-or-log-in-error">
      {error}
    </div>
  )

  return (
    <div className="sign-up-or-log-in">
      <h2>
        Create a New Account
        <hr />
      </h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="sign-up-or-log-in-login-error">{emailError}</div>
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          onChange={(event) => setName(event.target.value)}
        />
        <div className="sign-up-or-log-in-login-error">{nameError} </div>
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          onChange={(event) => setLastName(event.target.value)}
        />
        <div className="sign-up-or-log-in-login-error">{lastNameError}</div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="sign-up-or-log-in-login-error"> {passwordError}</div>
        <button>
          {showButtonSpinner ? (
            <div className="small-spinner"></div>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      {error && <Error />}
    </div>
  )
}

export default NewUser
