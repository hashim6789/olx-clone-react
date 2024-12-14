import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailsPage = () => {
  //   const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    imageUrl: "",
    location: "",
    sellerName: "",
    contactNo: "",
    _id: "",
  });
  const { productId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/product/${productId}`
        );

        setProduct(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductById();
  }, []);

  const getBackPage = () => {
    navigate(-1);
  };

  //api for fetching corresponding product details

  //   const nextImage = () => {
  //     setCurrentImageIndex((prev) =>
  //       prev === product.images.length - 1 ? 0 : prev + 1
  //     );
  //   };

  //   const prevImage = () => {
  //     setCurrentImageIndex((prev) =>
  //       prev === 0 ? product.images.length - 1 : prev - 1
  //     );
  //   };

  return (
    product && (
      <div>
        <div
          onClick={() => getBackPage()}
          className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 shadow-md cursor-pointer hover:bg-gray-200 hover:scale-110 transition-all"
        >
          <span className="text-lg text-black">&larr;</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative bg-black aspect-[16/9] mb-6">
                <img
                  src={
                    // product.images[currentImageIndex] || "/api/placeholder/800/600"
                    product.imageUrl
                  }
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
                {/* <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button> */}
                <img
                  src="/api/placeholder/60/20"
                  alt="OLX Logo"
                  className="absolute bottom-4 right-4 w-12 opacity-75"
                />
              </div>

              {/* Product Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* {product.isFeatured && (
              <span className="inline-block bg-yellow-400 text-xs px-2 py-1 rounded mb-4">
                FEATURED
              </span>
            )} */}

                {/* <h1 className="text-2xl font-bold mb-4">
              {product.title} ({new Date(product.postingDate).getFullYear()})
            </h1> */}

                <h2 className="text-xl font-bold mb-6">
                  ₹ {product.price.toLocaleString()}
                </h2>

                {/* Overview Section */}
                <div className="border-t border-b py-6 space-y-4 mb-6">
                  <h3 className="text-xl mb-4">Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">mileage</div>
                    <div>{product.mileage.toLocaleString()} km</div>
                  </div>
                </div> */}

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div>
                          {/* {product.location.area}, {product.location.city} */}
                          {product.location}
                        </div>
                      </div>
                    </div>

                    {/* <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Posting date</div>
                    <div>{product.postingDate}</div>
                  </div>
                </div> */}
                  </div>
                </div>

                {/* Description Section */}
                {/* <div className="mb-6">
              <h3 className="text-xl mb-4">Description</h3>
              <div className="space-y-2">
                {product.description.map((line, index) => (
                  <p key={index} className="text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            </div> */}
              </div>
            </div>

            {/* Right Column - Actions and Seller Info */}
            <div className="space-y-4">
              {/* Price and Action */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-3xl font-bold mb-4">
                  ₹ {product.price.toLocaleString()}
                </h2>
                <button className="w-full bg-teal-800 text-white py-3 rounded-md hover:bg-teal-900 transition-colors">
                  Make offer
                </button>
              </div>

              {/* Seller Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {/* <img
                src={product.seller.avatar || "/api/placeholder/50/50"}
                alt={product.sellerName}
                className="w-12 h-12 rounded-full"
              /> */}
                  <div>
                    <h3 className="font-semibold">{product.sellerName}</h3>
                    {/* <a href="#" className="text-blue-600 hover:underline">
                  View profile →
                </a> */}
                  </div>
                </div>

                <button className="w-full border-2 border-teal-800 text-teal-800 py-2 rounded-md hover:bg-teal-50 transition-colors mb-3">
                  Chat with seller
                </button>

                {product.contactNo && (
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <Phone className="w-4 h-4" />
                    <span>{product.contactNo}</span>
                    <button className="underline">Show number</button>
                  </div>
                )}
              </div>

              {/* Map Preview */}
              {/* {product.location.coordinates && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <img
                src="/api/placeholder/400/200"
                alt="Location map"
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-2 text-sm text-gray-600">
                {product.location.coordinates}
              </div>
              <a href="#" className="text-blue-600 text-sm hover:underline">
                View larger map
              </a>
            </div>
          )} */}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetailsPage;
