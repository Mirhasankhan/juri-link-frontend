import React from "react";

const ServiceCard = () => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:-translate-y-2 transition-transform duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 w-full rounded-t-md"></div>

        <div className="p-6">
          {/* Icon */}
          <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2h-3m-6 0H5a2 2 0 0 1-2-2V10z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Real Estate Law
          </h3>
          <p className="text-gray-600 mb-4">
            Complete real estate legal services for residential and commercial
            properties.
          </p>

          {/* Checklist */}
          <ul className="space-y-2 text-gray-700 text-sm">
            {[
              "Property Transactions",
              "Contract Review",
              "Title Issues",
              "Zoning Matters",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {/* Button */}
          <div className="mt-6">
            <button className="border rounded-[6px] py-2 text-sm w-full font-medium text-blue-600  transition">
              Learn More
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
