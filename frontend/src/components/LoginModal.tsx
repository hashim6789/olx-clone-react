import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { GoogleLogin } from "@react-oauth/google";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { login } = useAuth();

  const slides = [
    {
      icon: "🧑‍🦱",
      title: "Keep all your favourites in one place.",
    },
  ];

  const handleSuccess = async (response: any) => {
    try {
      // Fetch user profile after successful login
      const { credential } = response;

      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`, // ID Token URL
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const serverResponse = await axios.post(
        "http://localhost:3000/auth/google",
        {
          token: credential,
        }
      );

      console.log("User Data: ", serverResponse.data.data);
      const token = serverResponse.data.data.token;
      const picture = serverResponse.data.data.user.picture;
      const email = serverResponse.data.data.user.email;
      const name = serverResponse.data.data.user.name;
      const _id = serverResponse.data.data.user._id;

      login({ token, picture, email, name, _id });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {slides.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() =>
                setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))
              }
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="px-8 py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center text-4xl">
            {slides[currentSlide].icon}
          </div>

          <h2 className="text-xl text-center mb-8">
            {slides[currentSlide].title}
          </h2>

          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-teal-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="space-y-4">
            <button className="w-full border-2 border-black rounded py-3 px-4 flex items-center justify-center space-x-2 hover:bg-gray-50">
              <Phone className="w-5 h-5" />
              <span>Continue with phone</span>
            </button>

            <GoogleLogin onSuccess={handleSuccess}></GoogleLogin>

            <div className="flex items-center my-4">
              <div className="border-t flex-grow" />
              <span className="px-4 text-gray-500">OR</span>
              <div className="border-t flex-grow" />
            </div>

            <button className="w-full text-center text-blue-600 hover:text-blue-700 underline">
              Login with Email
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p className="mb-2">All your personal details are safe with us.</p>
            <p>
              If you continue, you are accepting
              <a href="#" className="text-blue-600 hover:underline">
                OLX Terms and Conditions
              </a>
              and
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      //
    </div>
  );
};

export default LoginModal;
