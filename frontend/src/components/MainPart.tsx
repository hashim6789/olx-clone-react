import { useEffect, useState } from "react";
import CategoryNavbar from "./CategoryNavbar";
import ProductListing from "./ProductListing";

// import products from "../assets/dummyProducts";
import axios from "axios";

const MainPart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        console.log(response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <CategoryNavbar />
      <ProductListing products={products} />
    </div>
  );
};

export default MainPart;
