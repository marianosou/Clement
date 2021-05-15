import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Link } from "react-router-dom"

const AdminUsers = () => {
  const token = localStorage.getItem("token")
  const currentUser = useSelector((state) => state.currentUser)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    if (currentUser)
      axios
        .get(`/api/users/admin/all/${currentUser.id}/${currentUser.isAdmin}`)
        .then((users) => setUserList(users.data))
  }, [currentUser])

  useEffect(() => {}, [userList])

  const adminHandler = (e, id, isAdmin) => {
    e.preventDefault()
    axios
      .put("/api/users/admin/updateuser", { token, id, isAdmin })
      .then(({ data }) => {
        setUserList(
          userList.map((user) => {
            if (user.id != data.id) {
              return user
            } else {
              user.isAdmin = data.isAdmin
              return user
            }
          })
        )
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      {currentUser.isAdmin ? (
        <div className="admin-users-container">
          <div className="admin-users-title">User Permissions</div>
          <hr />
          <div className="admin-users-labels">
            <div className="admin-users-column-1">First Name</div>
            <div className="admin-users-column-1">Last Name</div>
            <div className="admin-users-column-3">Email</div>
            <div className="admin-users-column-4">Admin</div>
          </div>
          <hr />
          {userList.length &&
            userList.map((user) => {
              return (
                <div
                  className={
                    user.isAdmin
                      ? "admin-single-user-container gray"
                      : "admin-single-user-container"
                  }
                  key={user.id}
                >
                  <div className="admin-users-column-1">{user.name}</div>
                  <div className="admin-users-column-1">{user.lastName}</div>
                  <div className="admin-users-column-3">{user.email}</div>
                  <div className="admin-users-column-4">
                    {user.isAdmin ? (
                      <button
                        type="submit"
                        onClick={(e) => adminHandler(e, user.id, user.isAdmin)}
                      >
                        Remove as Admin
                      </button>
                    ) : (
                      <button
                        onClick={(e) => adminHandler(e, user.id, user.isAdmin)}
                      >
                        Make Admin
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
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

export default AdminUsers
