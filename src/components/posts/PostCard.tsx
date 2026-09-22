"use client";

import {
  MapPin,
  DollarSign,
  Laptop2,
  MessageSquare,
  User,
  Clock,
  Briefcase,
} from "lucide-react";
import PostDetailModal from "./PostDetailModal";
import { formatDistanceToNow } from "date-fns";
import { JWTDecode } from "@/utils/jwt";
import { IoIosHeart } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToggleLikePostMutation } from "@/redux/features/post/post.api";

interface PostCardProps {
  post: any;
}

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();
  const [toggleLike] = useToggleLikePostMutation();
  const { decoded } = JWTDecode();

  const postId = post?._id || post?.id;
  const likedUsers = Array.isArray(post?.likedUsers) ? post.likedUsers : [];
  const hasLiked = Boolean(decoded?.id && likedUsers.includes(decoded.id));

  const handleToggleLikePost = async (id: string) => {
    if (!id) return;
    if (decoded?.email) {
      await toggleLike(id);
    } else {
      router.push(`/auth/login`);
    }
  };

  const handleMessage = (receiverId: string) => {
    if (!receiverId) return;
    if (decoded?.email) {
      router.push(`/messages?receiverId=${receiverId}`);
    } else {
      router.push(`/auth/login`);
    }
  };

  const timeAgo = post?.createdAt
    ? (() => {
        try {
          return formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          });
        } catch {
          return "";
        }
      })()
    : "";

  const formatBudget = (budget: any) => {
    if (!budget && budget !== 0) return "Flexible";
    const budgetStr = String(budget).trim();
    if (budgetStr.startsWith("$")) return budgetStr;
    if (!isNaN(Number(budgetStr))) {
      return `$${Number(budgetStr).toLocaleString()}`;
    }
    return budgetStr;
  };

  const getUrgencyBadge = (urgency?: string) => {
    const level = (urgency || "").toLowerCase();
    if (level === "high" || level === "urgent") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-rose-200/80 shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          High Urgency
        </span>
      );
    }
    if (level === "medium") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-amber-200/80">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Medium Urgency
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-200/80">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Low Urgency
      </span>
    );
  };

  const isOnline = post?.serviceType === "Online";

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-teal-600/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(46,121,153,0.1)] transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Subtle Top Accent Line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Header: Author & Urgency */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-teal-100 transition-all shrink-0 bg-slate-100">
              <Image
                src={
                  post?.userId?.profileImage ||
                  "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png"
                }
                alt={post?.userId?.fullName || "User profile"}
                width={48}
                height={48}
                className="object-cover w-full h-full"
                quality={95}
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight truncate group-hover:text-primary transition-colors">
                {post?.userId?.fullName || "Anonymous Client"}
              </h3>
              {timeAgo && (
                <span className="flex items-center gap-1 text-xs text-slate-400 font-normal mt-1">
                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                  {timeAgo}
                </span>
              )}
            </div>
          </div>

          <div className="shrink-0">
            {getUrgencyBadge(post?.urgencyLevel)}
          </div>
        </div>

        {/* Service Category Tag */}
        {post?.serviceId?.serviceName && (
          <div className="mt-3.5">
            <span className="inline-flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-[6px] border border-slate-200/70 transition-colors">
              <Briefcase className="w-3 h-3 text-slate-500" />
              {post.serviceId.serviceName}
            </span>
          </div>
        )}

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mt-2.5 mb-2 line-clamp-1">
          {post?.title || "Legal Consultation"}
        </h4>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4 font-normal">
          {post?.description || "No description provided."}
        </p>

        {/* Key Information Chips */}
        <div className="grid grid-cols-2 gap-2 my-4">
          {/* Budget */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-100/80">
            <div className="w-7 h-7 rounded-[9px] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold leading-none mb-0.5">
                Budget
              </span>
              <span className="font-bold text-slate-900 text-xs truncate block">
                {formatBudget(post?.budget)}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-100/80">
            <div className="w-7 h-7 rounded-[9px] bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold leading-none mb-0.5">
                Location
              </span>
              <span className="font-semibold text-slate-800 text-xs truncate block">
                {post?.location || "Remote / Any"}
              </span>
            </div>
          </div>

          {/* Consultation Mode */}
          <div className="col-span-2 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-100/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-7 h-7 rounded-[9px] flex items-center justify-center shrink-0 border ${
                  isOnline
                    ? "bg-teal-50 border-teal-100 text-teal-600"
                    : "bg-slate-100 border-slate-200 text-slate-600"
                }`}
              >
                {isOnline ? (
                  <Laptop2 className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <span className="text-xs font-semibold text-slate-800 truncate">
                {isOnline ? "Online Consultation" : "In Person Meeting"}
              </span>
            </div>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-[6px] shrink-0 ${
                isOnline
                  ? "bg-teal-50 text-teal-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isOnline ? "Virtual" : "Physical"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Social Actions & Contact */}
      <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Like Button */}
          <button
            type="button"
            onClick={() => handleToggleLikePost(postId)}
            className={`group/like flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 active:scale-95 ${
              hasLiked
                ? "bg-rose-50 border-rose-200 text-rose-600 shadow-xs"
                : "bg-slate-50 hover:bg-rose-50/70 border-slate-200/70 text-slate-600 hover:text-rose-600"
            }`}
            title={hasLiked ? "Unlike post" : "Like post"}
          >
            <IoIosHeart
              className={`transition-transform duration-200 group-hover/like:scale-115 ${
                hasLiked
                  ? "text-rose-600"
                  : "text-slate-400 group-hover/like:text-rose-500"
              }`}
              size={17}
            />
            <span>{likedUsers.length}</span>
          </button>

          {/* Comment Modal Button */}
          <PostDetailModal id={postId} />
        </div>

        {/* Direct Message CTA */}
        <button
          type="button"
          onClick={() => handleMessage(post?.userId?._id)}
          className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow hover:shadow-primary/25 active:scale-95 shrink-0"
        >
          <MessageSquare size={15} />
          <span>Send Message</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
