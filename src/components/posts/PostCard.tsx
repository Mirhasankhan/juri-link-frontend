"use client";
import {
  MapPin,
  DollarSign,
  Zap,
  Laptop2,
  Heart,  
  MessageSquare,
} from "lucide-react";
import PostDetailModal from "./PostDetailModal";

const PostCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition hover:shadow-lg">
      <div className="flex gap-2">
        <img
          className="h-16 w-16 rounded-full"
          src="https://images.unsplash.com/photo-1751716534754-e4eb69f18e90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        ></img>
        <div>
          <div>
            <h1 className="font-medium text-xl">
              Sarah johsn son <span className="text-gray-500">2h ago</span>
            </h1>
            <div className="flex gap-1 mt-1">
              <h1 className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
                Family Law
              </h1>
              <h1 className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
                State Law
              </h1>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-medium py-3">Need help in family law</h1>
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">
        I need a lawyer to help me file and process divorce documents in
        California. The process is already started, but I need legal guidance
        and filing help ASAP.
      </p>
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

      <div className="mt-6 flex justify-between items-center border-t pt-2">
        <div className="flex gap-8">
          <div className="flex text-gray-500 gap-2">
            <Heart></Heart>
            <p className="font-medium">24</p>
          </div>
         <PostDetailModal></PostDetailModal>
        </div>
        <button className="flex items-center gap-2 text-sm text-white font-medium px-2 rounded-[6px] bg-primary py-1">
          <MessageSquare size={15}></MessageSquare>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default PostCard;
