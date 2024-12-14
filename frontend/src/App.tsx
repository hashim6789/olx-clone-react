import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetailsPage from "./pages/ProductDetails";
// import ProductForm from "./components/ProductForm";
import MyProducts from "./pages/MyProducts";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoutes";
import AddProductForm from "./components/AddProductForm";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          {/* Protected Routes */}
          <Route
            path="/product/add"
            element={
              <ProtectedRoute>
                {/* <ProductForm /> */}
                <AddProductForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/my-products/:userId"
            element={
              <ProtectedRoute>
                <MyProducts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
