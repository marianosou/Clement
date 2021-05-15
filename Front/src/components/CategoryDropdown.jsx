import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"

const CategoryDropdown = () => {
  const currentUser = useSelector((state) => state.currentUser)
  const typeCategories = useSelector((state) => state.types)
  const countryCategories = useSelector((state) => state.countries)
  const yearCategories = useSelector((state) => state.years)
  const [showMenuType, setShowMenuType] = useState(false)
  const [showMenuCountry, setShowMenuCountry] = useState(false)
  const [showMenuYear, setShowMenuYear] = useState(false)
  const history = useHistory()

  const searchCategory = (query, model) => {
    history.push(`/search?q=${query}&m=${model}`)
  }

  return (
    <>
      {currentUser.isAdmin ? (
        <div className="navbar-categories">
          <div className="categoriesOptions">
          <Link to="/admin/categories"><button>Categories</button></Link>
          </div>
          <div className="categoriesOptions">
          <Link to="/admin/products"><button>Products</button></Link>
          </div>
          <div className="categoriesOptions">
            <Link to="/admin/users"><button>Users</button></Link>
          </div>
        </div>
      ) : (
        <div className="navbar-categories">
          <div className="navbar-categories-name">
            <button
              onClick={() => {
                setShowMenuType(!showMenuType)
                setShowMenuYear(false)
                setShowMenuCountry(false)
              }}
            >
              Type
            </button>
            {showMenuType ? (
              <div className="navbar-categories-list">
                {typeCategories.map((type, i) => {
                  return (
                    <div key={i}>
                      <button
                        onClick={() => {
                          searchCategory(type.name, "Type")
                          setShowMenuType(false)
                        }}
                      >
                        {type.name}
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
          <div className="navbar-categories-name">
            <button
              onClick={() => {
                setShowMenuCountry(!showMenuCountry)
                setShowMenuYear(false)
                setShowMenuType(false)
              }}
            >
              Country
            </button>
            {showMenuCountry ? (
              <div className="navbar-categories-list">
                {countryCategories.map((country, i) => {
                  return (
                    <div key={i}>
                      <button
                        onClick={() => {
                          searchCategory(country.name, "Country")
                          setShowMenuCountry(false)
                        }}
                      >
                        {country.name}
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
          <div className="navbar-categories-name">
            <button
              onClick={() => {
                setShowMenuYear(!showMenuYear)
                setShowMenuCountry(false)
                setShowMenuType(false)
              }}
            >
              Vintage
            </button>
            {showMenuYear ? (
              <div className="navbar-categories-list">
                {yearCategories.map((year, i) => {
                  return (
                    <div key={i}>
                      {" "}
                      <button
                        onClick={() => {
                          searchCategory(year.name, "Year")
                          setShowMenuYear(false)
                        }}
                      >
                        {year.name}
                      </button>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}

export default CategoryDropdown
