import React from "react";
import { Heart } from "lucide-react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import LoginModal from "./LoginModal";

interface ProductListingProps {
  products: Product[];
}

const SellCard: React.FC = () => {
  // const {auth} = useAuth()
  const navigate = useNavigate();

  const getAddProductPage = () => {
    navigate("/product/add");
  };
  return (
    <div className="bg-blue-500 text-white rounded-lg flex flex-col items-center justify-center p-6 h-full">
      <h3 className="text-xl font-semibold mb-4 text-center">
        Want to see your stuff here?
      </h3>
      <p className="text-center mb-6">
        Make some extra cash by selling things in your community. Go on, it's
        quick and easy.
      </p>
      <button
        onClick={() => getAddProductPage()}
        className="bg-white text-blue-500 px-8 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors"
      >
        Start selling
      </button>
    </div>
  );
};

const ProductListing: React.FC<ProductListingProps> = ({ products }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Fresh recommendations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => {
          if (index === 3) {
            return (
              <React.Fragment key={`sell-card`}>
                <ProductCard key={product._id} {...product} />
                <SellCard />
              </React.Fragment>
            );
          }
          return <ProductCard key={product._id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default ProductListing;
