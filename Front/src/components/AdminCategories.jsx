import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import { editType, setTypes, addOneType } from "../store/types"
import { editCountry, setCountries, addOneCountry } from "../store/countries"
import { editYear, setYears, addOneYear } from "../store/years"
import path from "path"

const AdminCategories = () => {
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()
  const types = useSelector((state) => state.types)
  const years = useSelector((state) => state.years)
  const countries = useSelector((state) => state.countries)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editItem, setEditItem] = useState()
  const [name, setName] = useState()
  const [showCountryAdd, setShowCountryAdd] = useState(false)
  const [showYearAdd, setShowYearAdd] = useState(false)
  const [showTypeAdd, setShowTypeAdd] = useState(false)
  const [addItem, setAddItem] = useState()

  const submitEditHandler = (e, id, route, stateFunc) => {
    e.preventDefault()
    const isAdmin = currentUser.isAdmin

    axios
      .put(`/api/categories/${route}/${id}/${isAdmin}`, { name })
      .then((category) => {
        dispatch(stateFunc(category.data))
      })
    setName()
  }

  const submitAddHandler = (e, route, stateFunc) => {
    e.preventDefault()
    const isAdmin = currentUser.isAdmin

    axios
      .post(`/api/categories/${route}/${isAdmin}`, { name })
      .then((newCategory) => {
        dispatch(stateFunc(newCategory.data))
      })
    setName()
  }

  const editForm = (e, name) => {
    e.preventDefault()
    setShowEditForm(!showEditForm)
    setEditItem(name)
    setName(name)
  }

  const addForm = (e, category) => {
    e.preventDefault()
    if (category === "type") {
      setShowTypeAdd(!showTypeAdd)
      setShowCountryAdd(false)
      setShowYearAdd(false)
    }
    if (category === "country") {
      setShowCountryAdd(!showCountryAdd)
      setShowTypeAdd(false)
      setShowYearAdd(false)
    }
    if (category === "year") {
      setShowYearAdd(!showYearAdd)
      setShowTypeAdd(false)
      setShowCountryAdd(false)
    }
    setAddItem(category)
  }

  const changeHandler = (e) => {
    setName(e.target.value)
  }

  const handleDelete = (e, id, route, setFunc, state) => {
    e.preventDefault()
    const isAdmin = currentUser.isAdmin

    axios.delete(`/api/categories/${route}/${id}/${isAdmin}`).then(() => {
      dispatch(setFunc(state.filter((category) => category.id != id)))
    })
  }

  return (
    <>
    {currentUser.isAdmin ?
      <div className="admin-categories-container">
        <div>
          <div className="admin-categories-single-container">
            <div className="admin-categories-single-title">Types</div>
            {types.length &&
              types.map((type) => (
                <>
                  <hr />
                  <div>
                    <div className="admin-categories-single-item" key={type.id}>
                      <div>{type.name}</div>
                      <div>
                        <img
                          className="admin-categories-edit-icon"
                          src={path.join(__dirname, "icons/edit.png")}
                          onClick={(e) => editForm(e, type.name)}
                        ></img>
                        <img
                          className="admin-categories-delete-icon"
                          src={path.join(__dirname, "icons/delete.png")}
                          onClick={(e) =>
                            handleDelete(e, type.id, "types", setTypes, types)
                          }
                        ></img>
                      </div>
                    </div>
                    {showEditForm && editItem === type.name ? (
                      <form
                        className="admin-categories-edit-form"
                        onSubmit={(e) =>
                          submitEditHandler(e, type.id, "types", editType)
                        }
                      >
                        <input
                          onChange={(e) => changeHandler(e)}
                          name="typeName"
                          type="text"
                          value={name}
                        />
                        <button type="submit">Submit</button>
                      </form>
                    ) : null}
                  </div>
                </>
              ))}
            <div>
              {showTypeAdd ? null : (
                <button onClick={(e) => addForm(e, "type")}>Add a type</button>
              )}

              {showTypeAdd && addItem === "type" ? (
                <form
                  className="admin-categories-edit-form"
                  onSubmit={(e) => submitAddHandler(e, "types", addOneType)}
                >
                  <label htmlFor="typeAdd"></label>
                  <input
                    onChange={(e) => changeHandler(e)}
                    name="typeAdd"
                    type="text"
                  />
                  <button type="submit">Add</button>
                </form>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <div className="admin-categories-single-container">
            <div className="admin-categories-single-title">Countries</div>
            {countries.length &&
              countries.map((country) => {
                return (
                  <>
                    <hr />
                    <div>
                      <div
                        className="admin-categories-single-item"
                        key={country.id}
                      >
                        <div>{country.name}</div>
                        <div>
                          <img
                            className="admin-categories-edit-icon"
                            src={path.join(__dirname, "icons/edit.png")}
                            onClick={(e) => editForm(e, country.name)}
                          ></img>
                          <img
                            className="admin-categories-delete-icon"
                            src={path.join(__dirname, "icons/delete.png")}
                            onClick={(e) =>
                              handleDelete(
                                e,
                                country.id,
                                "countries",
                                setCountries,
                                countries
                              )
                            }
                          ></img>
                        </div>
                      </div>
                      {showEditForm && editItem === country.name ? (
                        <form className="admin-categories-edit-form"
                          onSubmit={(e) =>
                            submitEditHandler(
                              e,
                              country.id,
                              "countries",
                              editCountry
                            )
                          }
                        >
                          <label htmlFor="typeName"></label>
                          <input
                            onChange={(e) => changeHandler(e)}
                            name="typeName"
                            type="text"
                            value={name}
                          />
                          <button type="submit">Submit</button>
                        </form>
                      ) : null}
                    </div>
                  </>
                )
              })}
            <div>
              {showCountryAdd ? null : (
                <button onClick={(e) => addForm(e, "country")}>
                  Add a country
                </button>
              )}
              {showCountryAdd && addItem === "country" ? (
                <form
                  className="admin-categories-edit-form"
                  onSubmit={(e) =>
                    submitAddHandler(e, "countries", addOneCountry)
                  }
                >
                  <label htmlFor="countryAdd"></label>
                  <input
                    onChange={(e) => changeHandler(e)}
                    name="countryAdd"
                    type="text"
                  />{" "}
                  <button type="submit">Add</button>
                </form>
              ) : null}
            </div>
          </div>
        </div>
        <div className="admin-categories-single-container">
          <div>
            <div className="admin-categories-single-title">Vintage</div>
            {years.length &&
              years.map((year) => {
                return (
                  <>
                    <hr />
                    <div>
                      <div
                        className="admin-categories-single-item"
                        key={year.id}
                      >
                        <div>{year.name}</div>
                        <div>
                          <img
                            className="admin-categories-edit-icon"
                            src={path.join(__dirname, "icons/edit.png")}
                            onClick={(e) => editForm(e, year.name)}
                          ></img>
                          <img
                            className="admin-categories-delete-icon"
                            src={path.join(__dirname, "icons/delete.png")}
                            onClick={(e) =>
                              handleDelete(e, year.id, "years", setYears, years)
                            }
                          ></img>
                        </div>
                      </div>
                      {showEditForm && editItem === year.name ? (
                        <form className="admin-categories-edit-form"
                          onSubmit={(e) =>
                            submitEditHandler(e, year.id, "years", editYear)
                          }
                        >
                          <label htmlFor="typeName"></label>
                          <input
                            onChange={(e) => changeHandler(e)}
                            name="typeName"
                            type="number"
                            value={name}
                          />
                          <button type="submit">Submit</button>
                        </form>
                      ) : null}
                    </div>
                  </>
                )
              })}
            <div>
              {showYearAdd ? null : (
                <button onClick={(e) => addForm(e, "year")}>Add a year</button>
              )}
              {showYearAdd && addItem === "year" ? (
                <form
                  className="admin-categories-edit-form"
                  onSubmit={(e) => submitAddHandler(e, "years", addOneYear)}
                >
                  <label htmlFor="yearAdd"></label>
                  <input
                    onChange={(e) => changeHandler(e)}
                    name="yearAdd"
                    type="number"
                  />
                  <button type="submit">Add</button>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      : <div className="empty-page-container">
      <div className="empty-page-title">
        Access Denied
        <Link to="/">
          <button>Continue Shopping</button>
        </Link>
      </div>
    </div>}
    </>
  )
}

export default AdminCategories
