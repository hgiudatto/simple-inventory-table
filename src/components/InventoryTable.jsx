import { useState, useEffect, Fragment } from "react";

const API_HOST = "http://localhost:3000";
const INVENTORY_API_URL = "${API_HOST}/inventory";

const InventoryTable = () => {
  const [data, setData] = useState([]);

  const fetchInventory = () => {
    fetch(`http://localhost:3000/inventory`, {
      method: "get",
      headers: new Headers({ test: "test" }),
    })
      .then((res) => res.json())
      /* .then((json) => setData(json)); */
      .then((result) => {
        console.log(result);
        setData(result);
      });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [unitPrice, setUnitPrice] = useState(null);

  const onEdit = ({ id, currentUnitPrice }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitPrice(currentUnitPrice);
  };

  const updateInventory = ({ id, newUnitPrice }) => {
    console.log("id to patch: ", id, " the new unit price: ", newUnitPrice); 

    fetch(`http://localhost:3000/inventory/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ unit_price: newUnitPrice }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Inventory after PATCH", json);
        onCancel();
        fetchInventory();
      });
  };

  const onSave = ({ id, newUnitPrice }) => {
    updateInventory({ id, newUnitPrice });
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setUnitPrice(null);
  };

  return (
    <div className="container">
      <h1>Simple Inventory Table</h1>
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
          {data.map((item) => (
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
                      onClick={() =>
                        onSave({ id: item.id, newUnitPrice: unitPrice })
                      }
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

export default InventoryTable;
