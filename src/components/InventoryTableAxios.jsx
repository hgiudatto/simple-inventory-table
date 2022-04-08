import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

const baseURL = `http://localhost:3000/inventory`;
const client = axios.create({
  baseURL: `http://localhost:3000/inventory`,
});

const InventoryTableAxios = () => {
  const [post, setPost] = useState();

  const retrieveInventory = () => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  };

  const updateInventory = (id, newUnitPrice) => {
    /* const res = await client.patch({ id: id, unit_price: newUnitPrice }); */
    console.log("id to be updated: ", id);
    axios
      .put(`http://localhost:3000/inventory/1`, {
        product_name: "Creamiest Shaving Foam",
        product_category: "Toiletries",
        unit_price: newUnitPrice
      })
      .then((response) => {
        onCancel();
        retrieveInventory();
      });
  };

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [unitPrice, setUnitPrice] = useState(null);

  const onEdit = ({ id, currentUnitPrice }) => {
    setInEditMode({ status: true, rowKey: id });
    setUnitPrice(currentUnitPrice);
  };

  const onCancel = () => {
    setInEditMode({ status: false, rowKey: null });
    setUnitPrice(null);
  };

  const onSave = ({ id, newUnitPrice }) => {
    updateInventory({ id, newUnitPrice });
  };

  const [error, setError] = useState(null);

  useEffect(() => {
    retrieveInventory();
  }, []);

  if (!post) return null;

  return (
    <div className="container">
      <h1>Simple Inventory Table (Axios)</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Unit Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {post.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.product_category}</td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <input
                    value={unitPrice}
                    onChange={(event) => setUnitPrice(event.target.value)}
                  />
                ) : (
                  item.unit_price
                )}
              </td>
              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <Fragment>
                    <button
                      className={"btn-success"}
                      onClick={() => {
                        onSave({ id: item.id, newUnitPrice: unitPrice });
                      }}
                    >
                      Save
                    </button>
                    <button
                      className={"btn-secondary"}
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </Fragment>
                ) : (
                  <button
                    className={"btn-primary"}
                    onClick={() =>
                      onEdit({ id: item.id, currentUnitPrice: item.unit_price })
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTableAxios;
