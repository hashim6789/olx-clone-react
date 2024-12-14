import React, { useRef } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryNavProps {
  categories?: Array<string>;
}

const CategoryNavbar: React.FC<CategoryNavProps> = ({
  categories = [
    "ALL CATEGORIES",
    "Cars",
    "Motorcycles",
    "Mobile Phones",
    "For Sale: Houses & Apartments",
    "Scooters",
    "Commercial & Other Vehicles",
    "For Rent: Houses & Apartments",
  ],
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-white border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-4 relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-6 overflow-x-auto scrollbar-hide py-3 px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className={`whitespace-nowrap cursor-pointer hover:text-blue-600 ${
                index === 0 ? "font-semibold flex items-center" : ""
              }`}
            >
              {category}
              {index === 0 && <ChevronDown className="w-4 h-4 ml-1" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;
