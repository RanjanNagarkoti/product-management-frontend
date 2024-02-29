import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";

const Product = ({ product }) => {
  return (
    <tr className="bg-white dark:bg-gray-800">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {product.id}
      </th>
      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
        {product.name}
      </td>
      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
        {product.price}
      </td>
      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
        {product.quantity}
      </td>
      <td className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex">
          <button className="text-blue-700 mr-1" title="Edit">
            {" "}
            <LuFileEdit />{" "}
          </button>

          <button
            className="text-red-700 ml-1"
            title="Delete"
            onClick={() => deleteCategory.mutate(product.id)}
          >
            {" "}
            <FaTrashAlt />{" "}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Product;
