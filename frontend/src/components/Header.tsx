import { useState } from "react";
import { Search, ChevronDown, Globe } from "lucide-react";
import LoginModal from "./LoginModal";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { auth, logout } = useAuth();
  const [isLoginModalOpen, setLoginmodalOpenOrNot] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const navigate = useNavigate();
  const openLoginModal = () => {
    console.log("open");
    setLoginmodalOpenOrNot(true);
  };
  const closeLoginModal = () => {
    console.log("close");
    setLoginmodalOpenOrNot(false);
  };

  const getAddProductPage = () => {
    auth ? navigate("/product/add") : openLoginModal();
  };
  const getMyProductPage = () => {
    auth ? navigate(`/product/my-products/${auth._id}`) : openLoginModal();
  };

  let leaveTimeout: number;

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeout);
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => {
      setMenuVisible(false);
    }, 500);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">OLX</div>

        <div className="flex items-center border rounded-md px-2 py-1">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="India"
            className="w-24 outline-none px-2"
          />
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <div className="flex items-center border rounded-md">
          <input
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
            className="w-full px-4 py-2 outline-none"
          />
          <button className="bg-gray-800 p-3">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1">
          <Globe className="w-5 h-5" />
          <span>ENGLISH</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Login */}
        {auth ? (
          <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-10 h-10 cursor-pointer">
              <img className="rounded-full" src={auth.picture} alt="User" />
            </div>

            {isMenuVisible && (
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-20"
              >
                <ul className="py-2">
                  <li
                    onClick={() => getMyProductPage()}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Products
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() =>
              isLoginModalOpen ? closeLoginModal() : openLoginModal()
            }
            className="font-semibold"
          >
            Login
          </button>
        )}

        {/* Sell Button */}
        <button
          onClick={() => getAddProductPage()}
          className="flex items-center space-x-1 bg-white border-2 border-black rounded-full px-4 py-1 font-semibold"
        >
          <span>+ SELL</span>
        </button>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </header>
  );
};

export default Header;
