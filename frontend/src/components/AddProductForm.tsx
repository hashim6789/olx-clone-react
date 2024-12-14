import React, { useReducer } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

interface FormState {
  title: string;
  price: string;
  location: string;
  sellerName: string;
  contactNo: string;
  productImage: File | null;
  errors: {
    [key: string]: string;
  };
}

interface Action {
  type: string;
  payload?: { name: string; value: string | File };
}

const initialState: FormState = {
  title: "",
  price: "",
  location: "",
  sellerName: "",
  contactNo: "",
  productImage: null,
  errors: {
    title: "",
    price: "",
    location: "",
    sellerName: "",
    contactNo: "",
    productImage: "",
  },
};

const productReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.payload!.name]: action.payload!.value,
        errors: { ...state.errors, [action.payload!.name]: "" },
      };
    case "SET_FILE":
      return {
        ...state,
        productImage: action.payload!.value as File,
        errors: { ...state.errors, productImage: "" },
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload!.name]: action.payload!.value as string,
        },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const validateField = (name: string, value: string | File | null): string => {
  switch (name) {
    case "title":
      return value ? "" : "Product name is required.";
    case "price":
      return value && !isNaN(Number(value)) && Number(value) > 0
        ? ""
        : "Valid price is required.";
    case "location":
      return value ? "" : "Location is required.";
    case "sellerName":
      return value ? "" : "Seller name is required.";
    case "contactNo":
      return value && /^[0-9]+$/.test(value as string)
        ? ""
        : "Valid contact number is required.";
    case "productImage":
      return value ? "" : "Product image is required.";
    default:
      return "";
  }
};

const ProductForm = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", payload: { name, value } });

    const error = validateField(name, value);
    if (error) {
      dispatch({ type: "SET_ERROR", payload: { name, value: error } });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    dispatch({
      type: "SET_FILE",
      payload: { name: "productImage", value: file! },
    });

    const error = validateField("productImage", file);
    if (error) {
      dispatch({
        type: "SET_ERROR",
        payload: { name: "productImage", value: error },
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    // Validate all fields
    Object.entries(state).forEach(([key, value]) => {
      if (key !== "errors") {
        const error = validateField(key, value);
        if (error) {
          isValid = false;
          dispatch({ type: "SET_ERROR", payload: { name: key, value: error } });
        }
      }
    });

    if (!isValid) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    // Proceed with form submission if valid
    if (auth) {
      const { title, price, location, sellerName, contactNo, productImage } =
        state;

      // Create a FormData object for file uploads
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price.toString());
      formData.append("location", location);
      formData.append("sellerName", sellerName);
      formData.append("contactNo", contactNo);
      formData.append("productImage", productImage as File); // Add the file to the FormData
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
        dispatch({
          type: "RESET_FORM", // Reset the form after successful submission
        });
        toast.success("Product created successfully!");
      } catch (error) {
        console.error("Error creating product:", error);
        toast.error("Error creating product. Please try again.");
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
        {" "}
        <ToastContainer />
        <form
          onSubmit={handleFormSubmit}
          className="max-w-md w-full bg-white p-6 shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
            Create Product
          </h2>

          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={state.title}
              onChange={handleChange}
              className={`shadow-sm block w-full text-sm p-2 rounded-lg border ${
                state.errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
            />
            {state.errors.title && (
              <p className="text-red-500 text-xs mt-1">{state.errors.title}</p>
            )}
          </div>

          {/* Price */}
          <div className="mb-4">
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
              value={state.price}
              onChange={handleChange}
              className={`shadow-sm block w-full text-sm p-2 rounded-lg border ${
                state.errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter price"
            />
            {state.errors.price && (
              <p className="text-red-500 text-xs mt-1">{state.errors.price}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              type="file"
              id="productImage"
              onChange={handleFileChange}
              className={`block w-full text-sm p-2 rounded-lg border ${
                state.errors.productImage ? "border-red-500" : "border-gray-300"
              }`}
            />
            {state.errors.productImage && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.productImage}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={state.location}
              onChange={handleChange}
              className={`shadow-sm block w-full text-sm p-2 rounded-lg border ${
                state.errors.location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter location"
            />
            {state.errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.location}
              </p>
            )}
          </div>

          {/* Seller Name */}
          <div className="mb-4">
            <label
              htmlFor="sellerName"
              className="block text-sm font-medium text-gray-700"
            >
              Seller Name
            </label>
            <input
              type="text"
              id="sellerName"
              name="sellerName"
              value={state.sellerName}
              onChange={handleChange}
              className={`shadow-sm block w-full text-sm p-2 rounded-lg border ${
                state.errors.sellerName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter seller name"
            />
            {state.errors.sellerName && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.sellerName}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div className="mb-6">
            <label
              htmlFor="contactNo"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={state.contactNo}
              onChange={handleChange}
              className={`shadow-sm block w-full text-sm p-2 rounded-lg border ${
                state.errors.contactNo ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter contact number"
            />
            {state.errors.contactNo && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.contactNo}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
