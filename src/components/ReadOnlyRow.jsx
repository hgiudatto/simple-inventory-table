import React from "react";

const ReadOnlyRow = ({prod}) => {
  return (
    <div>
      <tr>
        <td>{prod.product_name}</td>
        <td>{prod.unit_price}</td>
      </tr>
    </div>
  );
};

export default ReadOnlyRow;
