import { useState } from "react";
import axiosInstance from "../../../axios";
import AddProductModal from "./AddProductModal";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showProductsToggle, setShowProductToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Fetch all products from the backend
  const fetchProducts = async () => {
    if (showProductsToggle) {
      setShowProductToggle(!showProductsToggle);
      return;
    }
    try {
      const result = await axiosInstance.get("/admin/getproducts");
      setProducts(result.data?.response);
      setShowProductToggle(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Edit Product
  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  // Handle Change in Input Fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Confirm Update (Send Data to Backend)
  const handleConfirm = async () => {
    try {
      const { _id, ...updatedData } = formData;
      console.log(_id, updatedData);

      const response = await axiosInstance.patch("/admin/updateProduct", {
        productId: _id,
        updatedData,
      });

      if (response.status === 201) {
        alert("Product updated successfully!");
        setShowModal(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/deleteproduct/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="p-4">
      {/* Button Section */}
      <div className="mb-6 flex justify-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md block m-2"
          onClick={() => setShowAddProductModal(!showAddProductModal)}
        >
          Add New Product
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md block m-2 cursor-pointer"
          onClick={fetchProducts}
        >
          Show All Products
        </button>
      </div>

      {showAddProductModal && (
        <AddProductModal onClose={() => setShowAddProductModal(false)} />
      )}

      {/* Show Products Only After Button Click */}
      {showProductsToggle && (
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold ml-4 text-lg">
            Total: {products?.length}
          </h1>
          {products.map((p, index) => (
            <div
              className="border border-gray-300 rounded-lg shadow-lg p-4 flex flex-row items-center gap-4 w-full"
              key={index}
            >
              {/* Product Image */}
              <div className="w-36 h-36 flex-shrink-0">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p className="text-gray-500">
                  <strong>Brand:</strong> {p.brand}
                </p>
                <p className="text-gray-500">
                  <strong>Category:</strong> {p.category}
                </p>
                <p className="text-gray-500">
                  <strong>Pack Size:</strong> {p.pack_size}
                </p>
                <p className="text-gray-500">
                  <strong>Price:</strong> ₹{p.price}
                </p>
                <p className="text-gray-500">
                  <strong>Stock:</strong> {p.stockSize}
                </p>
                <p className="text-gray-500">
                  <strong>Description :</strong> {p.description}
                </p>
                {p.images.map((i, index) => (
                  <p className="text-gray-500">
                    <strong>image {index + 1} :</strong> {i}
                  </p>
                ))}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto h-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 md:mx-0 h-auto overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Edit Product
            </h2>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Product Name"
                />
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Brand"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Category"
                />
              </div>

              <div>
                <label
                  htmlFor="pack_size"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pack Size
                </label>
                <input
                  type="text"
                  id="pack_size"
                  name="pack_size"
                  value={formData.pack_size}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Pack Size"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Price"
                />
              </div>

              <div>
                <label
                  htmlFor="oprice"
                  className="block text-sm font-medium text-gray-700"
                >
                  Oprice
                </label>
                <input
                  type="number"
                  id="oprice"
                  name="oprice"
                  value={formData.oprice}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Oprice"
                />
              </div>

              <div>
                <label
                  htmlFor="stockSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Stock Size
                </label>
                <input
                  type="number"
                  id="stockSize"
                  name="stockSize"
                  value={formData.stockSize}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Stock Size"
                />
              </div>

              <div>
                <label
                  htmlFor="dose_form"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dose Form
                </label>
                <input
                  type="text"
                  id="dose_form"
                  name="dose_form"
                  value={formData.dose_form}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Dose Form"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  placeholder="Product Description"
                />
              </div>

              {formData.images.map((i, index) => (
                <div key={index}>
                  <label
                    htmlFor={`image-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`image-${index}`}
                    name={`image-${index}`}
                    value={i}
                    onChange={handleChange}
                    className="border p-2 rounded-md w-full"
                    placeholder={`Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-between mt-6">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-md w-full sm:w-auto"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
