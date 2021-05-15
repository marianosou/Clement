import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Home = () => {
  const currentUser = useSelector((state) => state.currentUser)
  return (
    <>
      <div className="home-main-picture">
        <Link to="/search?q=Red&m=Type">
          <div>
            <img src="images/home1.jpg"></img>
            <div className="home-main-tagline">Red Wines</div>
          </div>
        </Link>
      </div>
      <div className="home-two-picture-row">
        <div>
          <Link to="search?q=Italy&m=Country">
            <img src="images/italy.jpg"></img>
          </Link>
          <div className="home-picture-title">
            Explore Our Exquisite Italian Wines
          </div>
        </div>
        <div>
          <Link to="/search?q=White&m=Type">
            <img src="images/white.jpg"></img>
          </Link>
          <div className="home-picture-title">
            Dive into the Sweetness of White Wines
          </div>
        </div>
        <div>
          <Link to="search?q=France&m=Country">
            <img src="images/french.jpg"></img>
          </Link>
          <div className="home-picture-title">
            Enjoy Our Fine Selection of French Wines
          </div>
          <div className="home-picture-tagline"></div>
        </div>
      </div>
    </>
  )
}

export default Home
