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
import { formatDistanceToNow } from "date-fns";

const PostCard = ({post}:{post:any}) => {
  console.log(post);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition hover:shadow-lg">
      <div className="flex gap-2">
        <img
          className="h-16 w-16 rounded-full"
          src={post?.userId?.profileImage}
        ></img>
        <div>
          <div>
            <h1 className="font-medium text-xl">
              {post?.userId?.fullName} <span className="text-gray-500 text-xs">
  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
</span>
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

      <h1 className="text-xl font-medium py-3">{post?.title}</h1>
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">
       {post.description}
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{post.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span>{post.budget}</span>
        </div>
        <div className="flex items-center gap-2">
          <Laptop2 className="h-4 w-4 text-gray-500" />
          <span>Online Consultation</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>{post.urgencyLevel}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-2">
        <div className="flex gap-8">
          <div className="flex items-center text-gray-500 gap-2">
            <Heart size={20}></Heart>
            <p className="font-medium">{post.likedUsers.length}</p>
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
