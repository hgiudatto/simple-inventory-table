import React from "react";

const ReadOnlyRow = ({ prod, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{prod.product_name}</td>
      <td>{prod.unit_price}</td>
      <td>
        <button
          type="button"
          onClick={(event) => {
            handleEditClick(event, prod);
          }}
        >
          Edit
        </button>
        {/* INFO: Cuando llamamos a una funcion como handleDeleteClick(prod.id) pasandole parametros debemos definir una funcion flecha para impedir que la funcion a la que estamos llamando se invoque inmediatamente; no queremos que ocurra esto sino que nuestra funcion se llame cuando ocurra el click  */}
        <button type="button" onClick={() => handleDeleteClick(prod.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
