import { useState } from "react";
import axiosInstance from "../../../axios";

const AddProductModal = ({ onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    price: "",
    oprice: "",
    description: "",
    stockSize: "",
    dose_form: "",
    pack_size: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        "/product/addProduct",
        formData
      );

      if (response.status === 201) {
        alert("Product added successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 md:mx-0">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(formData).map((key, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700">
                {key.replace("_", " ").toUpperCase()}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
                placeholder={key}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-md w-full sm:w-auto"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
