import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard: React.FC<Product> = ({
  title,
  price,
  location,
  imageUrl,
  _id,
}) => {
  const [isWishlisted, setWishlist] = useState(false);
  return (
    <div
      key={_id}
      className="bg-white rounded-lg border hover:shadow-md transition-shadow"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/product/${_id}`}>
          <img
            src={imageUrl || "/api/placeholder/400/300"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </Link>
        <button
          onClick={() => setWishlist(!isWishlisted)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md"
        >
          <Heart fill={isWishlisted ? "red" : "white"} className="w-6 h-6" />
        </button>
        {/* {isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded">
            FEATURED
          </span>
        )} */}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <div className="text-xl font-bold">₹ {price.toLocaleString()}</div>

        {/* Year and Mileage / Property Specs */}
        {/* {year && mileage ? (
          <div className="text-sm text-gray-600">
            {year} - {mileage.toLocaleString()} km
          </div>
        ) : (
          propertySpecs && (
            <div className="text-sm text-gray-600">{propertySpecs}</div>
          )
        )} */}

        {/* Title */}
        <div className="text-sm mt-1 line-clamp-2" title={title}>
          {title}
        </div>

        {/* Location and Date */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span className="truncate max-w-[70%]">{location}</span>
          {/* <span>{date}</span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
