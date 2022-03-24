import { useState, useEffect } from "react";

const API_HOST = "http://localhost:3000";
const INVENTORY_API_URL = "${API_HOST}/inventory";

const InventoryTable = () => {
  const [data, setData] = useState([]);

  const fetchInventory = () => {
    fetch("http://localhost:3000/inventory", {
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
              <td>{item.unit_price}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
