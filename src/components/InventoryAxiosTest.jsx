import React, { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

const baseUrl = "http://localhost:3000/inventory";

const InventoryAxiosTest = () => {
  const [post, setPost] = useState(null);
  const [postChanged, setPostChanged] = useState(false);
  const [totalPosts, setTotalPosts] = useState(null);

  const [editFormData, setEditFormData] = useState({
    product_name: "",
    product_category: "",
    unit_price: "",
  });

  const [addFormData, setAddFormData] = useState({
    product_name: "",
    product_category: "",
    unit_price: "",
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
      product_name: addFormData.product_name,
      product_category: addFormData.product_category,
      unit_price: addFormData.unit_price,
    };

    addPost(newPost);

    const newPosts = [...post, newPost];
    console.log("Handling add form submit -> newPosts: ", newPosts);
    setPost(newPosts);
  };

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log("Getting the posts...", response.data);
      setPost(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      console.log("Getting the posts...", response.data);
      setPost(response.data);
    });
  }, [postChanged]);

  /* useEffect(() => {
    axios.get(`${baseUrl}/1`).then((response) => {
      setPost(response.data);
    })
  }, []); */

  if (!post) {
    return null;
  }

  /* TODO Agregar boton de eliminar un proiducto */

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
      console.log("POST STATUS: ", response.status);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateFirstPost() {
    try {
      const response = await axios.put(`${baseUrl}/1`, {
        product_name: "Waikiki Beach Soft Baby Shampoo",
        product_category: "Tolietries",
        unit_price: "158.17",
      });
      console.log("POST STATUS: ", response.status);
      setPostChanged(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePost(id) {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, {
        product_name: "Waikiki Beach Blue Deep-sea Sponge",
        product_category: "Tolietries",
        unit_price: "230",
      });
      console.log("POST STATUS: ", response.status);
      setPostChanged(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function retrieveAPost(thisPost) {
    // first retrieve this post
    const aPost = await axios.get(`${baseUrl}`, {
      params: { id: thisPost.id },
    });

    // second update it
    console.log("Retrieving this post => ", aPost);
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
              <td>
                <button
                  onClick={() => {
                    updatePost(prod.id);
                  }}
                >
                  Change
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    retrieveAPost(prod);
                  }}
                >
                  Retrieve this post
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <h2>Add a Product</h2>
      <button onClick={updateFirstPost}>Update 1st post</button>
      <button onClick={() => updatePost(2)}>Update 2nd post</button>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="product_name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="product_category"
          required="required"
          placeholder="Enter a category..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="unit_price"
          required="required"
          placeholder="Enter a price..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
        <br></br>
      </form>
    </div>
  );
};

export default InventoryAxiosTest;
