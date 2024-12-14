import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductsByUserId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/my-products/${userId}`
        );

        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsByUserId();
  }, []);

  const removeProduct = async (productId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/product/${productId}`
      );
      if (response.data) {
        console.log("Product removed successfully:", response.data);
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error("Failed to remove product:", response.data.message);
      }
    } catch (error) {
      console.error("Error occurred while removing the product:", error);
    }
  };

  const getBackPage = () => {
    navigate(-1);
  };

  return (
    <div>
      <div
        onClick={() => getBackPage()}
        className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 shadow-md cursor-pointer hover:bg-gray-200 hover:scale-110 transition-all"
      >
        <span className="text-lg text-black">&larr;</span>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
        {products.length > 0 ? (
          <div className="grid gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-lg overflow-hidden flex"
                style={{ height: "250px" }}
              >
                <div className="w-1/3">
                  <img
                    src={product.imageUrl || "placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-4">
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Seller:</span>
                        {product.sellerName}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Location:</span>
                        {product.location}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-medium text-gray-900">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Contact: {product.contactNo}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.productImage
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.productImage ? "Available" : "Image Missing"}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => removeProduct(product._id as string)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
