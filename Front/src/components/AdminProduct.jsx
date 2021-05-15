import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const AdminProduct = () => {
  const Product = JSON.parse(localStorage.getItem('currentProduct'));
  const currentProduct = Product ? Product : {};
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser);
  const years = useSelector((state) => state.years);
  const countries = useSelector((state) => state.countries);
  const types = useSelector((state) => state.types);
  const [name, setname] = useState(currentProduct.name);
  const [brand, setBrand] = useState(currentProduct.brand);
  const [region, setRegion] = useState(currentProduct.region);
  const [price, setPrice] = useState(currentProduct.price);
  const [description, setDescription] = useState(currentProduct.description);
  const [size, setSize] = useState(currentProduct.size);
  const [stock, setStock] = useState(currentProduct.stock);
  const [picture, setPicture] = useState(currentProduct.urlPicture);
  const [type, setType] = useState(currentProduct.typeId);
  const [year, setYear] = useState(currentProduct.yearId);
  const [country, setCountry] = useState(currentProduct.countryId);


  const handleChange = (e, set) => {
    set(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const countryId = Number(country);
    const typeId = Number(type);
    const yearId = Number(year);
    const sizeNumber = Number(size);
    const stockNumber = Number(stock);
    const priceNumber = Number(price);

    if (currentProduct.id) {
      axios
        .put(`/api/products/${currentProduct.id}/${currentUser.isAdmin}`, {
          name: name,
          brand: brand,
          region: region,
          description: description,
          price: priceNumber,
          size: sizeNumber,
          stock: stockNumber,
          urlPicture: picture,
          countryId: countryId,
          yearId: yearId,
          typeId: typeId,
        })
        .then((product) =>{
          history.push(`/products/${product.data.id}`)
          // history.push(`/admin/products/`)
        });
    } else {
      axios.post("/api/products/", {
        name,
        brand,
        region,
        description,
        price: priceNumber,
        size: sizeNumber,
        stock: stockNumber,
        urlPicture: picture,
        countryId,
        yearId,
        typeId,
      })
      .then((product) =>{
        history.push(`/products/${product.data.id}`)
      })
    }
    localStorage.removeItem("currentProduct");
  };

  return (
    <div className="admin-product-edit">
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => handleChange(e, setname)}
          name="name"
          value={name}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="brand">Brand</label>
        <input
          onChange={(e) => handleChange(e, setBrand)}
          name="brand"
          value={brand}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="Region">Region</label>
        <input
          onChange={(e) => handleChange(e, setRegion)}
          name="Region"
          value={region}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="Description">Description</label>
        <textarea className="admin-product-edit-description"
          onChange={(e) => handleChange(e, setDescription)}
          name="Description"
          value={description}
        />
      </div>
      <div>
        <label htmlFor="Price">Price</label>
        <input
          onChange={(e) => handleChange(e, setPrice)}
          name="Price"
          value={price}
          type="number"
        />
      </div>
      <div>
        <label htmlFor="Size">Size</label>
        <input
          onChange={(e) => handleChange(e, setSize)}
          name="Size"
          value={size}
          type="number"
        />
      </div>
      <div>
        <label htmlFor="Stock">Stock</label>
        <input
          onChange={(e) => handleChange(e, setStock)}
          name="Stock"
          value={stock}
          type="number"
        />
      </div>
      <div>
        <label htmlFor="Picture">Picture</label>
        <input
          onChange={(e) => handleChange(e, setPicture)}
          name="Picture"
          value={picture}
          type="text"
        />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <select
          value={type}
          onChange={(e) => handleChange(e, setType)}
          name="type"
          id=""
        >
          <option value="">Choose a Type</option>
          {types.length &&
            types.map((type) => {
              return (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <label htmlFor="year">Year</label>
        <select
          value={year}
          onChange={(e) => handleChange(e, setYear)}
          name="year"
          id=""
        >
           <option value="">Choose a Year</option>
          {years.length &&
            years.map((year) => {
              return (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <select
          value={country}
          onChange={(e) => handleChange(e, setCountry)}
          name="country"
          id=""
        >
          <option value="">Choose a Country</option>
          {countries.length &&
            countries.map((country) => {
              return (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
};

export default AdminProduct;
