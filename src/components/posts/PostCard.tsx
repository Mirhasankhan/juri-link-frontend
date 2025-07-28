"use client";
import { MapPin, DollarSign, Zap, Laptop2 } from "lucide-react";

const PostCard = () => {
  return (
    <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition hover:shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Need help with divorce paperwork
      </h2>

      {/* Category */}
      <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
        Family Law
      </span>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">
        I need a lawyer to help me file and process divorce documents in
        California. The process is already started, but I need legal guidance
        and filing help ASAP.
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>Los Angeles, CA</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span>$100 - $500</span>
        </div>
        <div className="flex items-center gap-2">
          <Laptop2 className="h-4 w-4 text-gray-500" />
          <span>Online Consultation</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>Urgent</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default PostCard;
