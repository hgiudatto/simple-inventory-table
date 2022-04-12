import React from "react";

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="product_name"
          value={editFormData.product_name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a price..."
          name="unit_price"
          value={editFormData.product_category}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditableRow;
