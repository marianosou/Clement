import React, { useState } from "react"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import path from "path"

const AdminProducts = () => {
  const [products, setProducts] = useState("loading")
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    localStorage.removeItem("currentProduct")
    axios
      .get("/api/products/")
      .then(({ data }) => {
        setProducts(data)
      })
      .catch((err) => console.log(err))
    return () => setProducts("loading")
  }, [])

  React.useEffect(() => {}, [products])

  const handleEdit = (e, product) => {
    e.preventDefault()
    localStorage.setItem("currentProduct", JSON.stringify(product))
    history.push(`/admin/product/edit`)
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    axios
      .delete(`/api/products/admin/delete/${id}/${currentUser.isAdmin}`)
      .then(() => setProducts(products.filter((product) => product.id != id)))
  }
  return (
    <>
      {currentUser.isAdmin ? (
        products === "loading" ? (
          <div className="loader"></div>
        ) : (
          <>
            <div className="admin-products-title-and-button">
              <div className="results-title">Manage Products</div>
              <div className="admin-products-add-new-product">
                <Link to="/admin/product/edit">
                  <button>Add New Product</button>
                </Link>
              </div>
            </div>
            <div className="results-container">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="single-result admin-products-single-product"
                >
                  <img
                    className="admin-products-delete-icon"
                    src={path.join(__dirname, "icons/delete.png")}
                    onClick={(e) => handleDelete(e, product.id)}
                  ></img>
                  <img
                    className="admin-products-edit-icon"
                    src={path.join(__dirname, "icons/edit.png")}
                    onClick={(e) => handleEdit(e, product)}
                  ></img>
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
                  {/* <button
                  className="add-to-cart-results"
                  onClick={(e) => handleEdit(e, product)}
                >
                  Edit
                </button> */}
                </div>
              ))}
            </div>
          </>
        )
      ) : (
        <div className="empty-page-container">
          <div className="empty-page-title">
            Access Denied
            <Link to="/">
              <button>Continue Shopping</button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminProducts
