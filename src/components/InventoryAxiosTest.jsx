import React, { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

const baseUrl = "http://localhost:3000/inventory";

const InventoryAxiosTest = () => {
  const [post, setPost] = useState(null);
  const [totalPosts, setTotalPosts] = useState(null);

  const [editFormData, setEditFormData] = useState({
    productName: "",
    productCategory: "",
    unitPrice: "",
  });

  const [addFormData, setAddFormData] = useState({
    productName: "",
    productCategory: "",
    unitPrice: "",
  });

  const handleAddFormChange = (event) => {
    debugger;
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    debugger;
    event.preventDefault();

    const newPost = {
      id: nanoid(),
      productName: addFormData.productName,
      productCategory: addFormData.productCategory,
      unitPrice: addFormData.unitPrice,
    };

    addPost(newPost);

    const newPosts = [...post, newPost];
    console.log("Handling add form submit -> newPosts: ", newPosts);
    setPost(newPosts);
  };

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log('Getting the posts...', response.data);
      setPost(response.data);
    });
  }, []);

  /* useEffect(() => {
    axios.get(`${baseUrl}/1`).then((response) => {
      setPost(response.data);
    })
  }, []); */

  if (!post) {
    return null;
  }

  /* TODO Agregar tabla con los posts */

  const createPost = () => {
    axios
      .post(baseUrl, {
        product_name: "Double Edge Razor Blade Sample Mixed Pack",
        product_category: "Toiletries",
        unit_price: "2.49 EUR",
      })
      .then((response) => {
        setPost(response.data);
      });
  };

  async function addPost(newPost) {
    try {
      const response = await axios.post(baseUrl, newPost);
      console.log('POST STATUS: ', response.status);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container">
      <h1>{post.product_name}</h1>
      <p>{post.product_category}</p>
      <p>{post.unit_price}</p>
      {/* <button onClick={createPost}>Create Post</button>
      <br></br> */}
      <h1>Toiletries</h1>
      <table className="tbl-header">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {post.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.product_name}</td>
              <td>{prod.unit_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <h2>Add a Product</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="productName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="productCategory"
          required="required"
          placeholder="Enter a category..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="unitPrice"
          required="required"
          placeholder="Enter a price..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default InventoryAxiosTest;
