import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure this import is present
import { useAuth } from "../contexts/authContext";

const ProductForm = () => {
  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    location: "",
    sellerName: "",
    contactNo: "",
    productImage: null, // Add productImage to the state
  });

  const { auth } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProduct((prev) => ({
        ...prev,
        productImage: e.target.files![0], // Store the selected file in state
      }));
    }
  };

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth) {
      // Form validation
      const { title, price, location, sellerName, contactNo, productImage } =
        product;
      if (
        !title ||
        !price ||
        !location ||
        !sellerName ||
        !contactNo ||
        !productImage
      ) {
        console.log("Please fill in all the fields.");
        toast.error("Please fill in all the fields.");
        return;
      }

      // Create a FormData object for file uploads
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price.toString());
      formData.append("location", location);
      formData.append("sellerName", sellerName);
      formData.append("contactNo", contactNo);
      formData.append("productImage", productImage); // Add the file to the FormData
      formData.append("userId", auth._id);
      try {
        const response = await axios.post(
          "http://localhost:3000/product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Specify the correct content type
            },
          }
        );

        console.log("Product created successfully:", response.data);
        setProduct({
          title: "",
          price: 0,
          location: "",
          sellerName: "",
          contactNo: "",
          productImage: null,
        });
        toast.success("Product created successfully!");
      } catch (error) {
        console.error("Error creating product:", error);
      }
    }
  };

  const getBackPage = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div
        onClick={() => getBackPage()}
        className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 shadow-md cursor-pointer hover:bg-gray-200 hover:scale-110 transition-all"
      >
        <span className="text-lg text-black">&larr;</span>
      </div>
      <div className="flex justify-center items-center ">
        <ToastContainer />
        <form
          onSubmit={handleFormSubmission}
          className="max-w-lg w-full bg-white p-6 shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
            Create Product
          </h2>

          {/* Product Name */}
          <div className="mb-5">
            <label
              htmlFor="productName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="shadow-sm bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-5">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="shadow-sm bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-5">
            <label
              htmlFor="productImage"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              type="file"
              id="productImage"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:ring-gray-300 focus:border-gray-400"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={product.location}
              onChange={handleChange}
              className="shadow-sm bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Seller Name */}
          <div className="mb-5">
            <label
              htmlFor="sellerName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Seller Name
            </label>
            <input
              type="text"
              id="sellerName"
              name="sellerName"
              value={product.sellerName}
              onChange={handleChange}
              className="shadow-sm bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
              placeholder="Enter seller name"
              required
            />
          </div>

          {/* Seller Contact */}
          <div className="mb-5">
            <label
              htmlFor="contactNo"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Seller Contact
            </label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={product.contactNo}
              onChange={handleChange}
              className="shadow-sm bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-400 block w-full p-2.5"
              placeholder="Enter contact number"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create Product
          </button>
        </form>
        <button onClick={() => toast.success("Lorem ipsum dolor")}>
          click
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
