import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const baseUrl = "http://localhost:3000/inventory";

const InventoryAxiosTest = () => {
  const [post, setPost] = useState(null);
  const [postChanged, setPostChanged] = useState(false);
  const [totalPosts, setTotalPosts] = useState(null);

  const [editFormData, setEditFormData] = useState({
    product_name: "",
    unit_price: "",
  });

  const [addFormData, setAddFormData] = useState({
    product_name: "",
    unit_price: "",
  });

  const [editProductId, setEditProductId] = useState();

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    debugger;
    event.preventDefault();

    const newPost = {
      id: nanoid(),
      product_name: editFormData.product_name,
      product_category: editFormData.product_category,
      unit_price: editFormData.unit_price,
    };

    addPost(newPost);

    const newPosts = [...post, newPost];
    console.log("Handling add form submit -> newPosts: ", newPosts);
    setPost(newPosts);
  };

  const handleEditClick = (event, product) => {
    event.preventDefault();
    setEditProductId(product.id);

    const formValues = {
      product_name: product.product_name,
      unit_price: product.unit_price,
    };

    setEditFormData(formValues);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedProduct = {
      id: editProductId,
      product_name: editFormData.product_name,
      unit_price: editFormData.unit_price,
    };

    const newPoducts = [...post];

    const index = post.findIndex((product) => product.id === editProductId);

    newPoducts[index] = editedProduct;

    setPost(newPoducts);
    setEditProductId(null);
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

  const handleCancelClick = () => {
    setEditProductId(null);
  };

  const handleDeleteClick = (productId) => {
    const newProducts = [...post];

    const index = post.findIndex((prod) => prod.id === productId);

    newProducts.splice(index, 1);

    setPost(newProducts);
  };

  return (
    <div className="container">
      <h1>{post.product_name}</h1>
      <p>{post.product_category}</p>
      <p>{post.unit_price}</p>
      {/* <button onClick={createPost}>Create Post</button>
      <br></br> */}
      <h1>Toiletries</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table className="tbl-header">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {post.map((prod) => (
              <Fragment>
                {editProductId === prod.id ? (
                  <EditableRow
                    key={prod.id}
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    key={prod.id}
                    prod={prod}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
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
