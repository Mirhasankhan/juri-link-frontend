"use client";

import { useChatSocket } from "@/components/message/user.chat.socket";
import { uploadImage } from "@/components/message/UploadImage";
import { JWTDecode } from "@/utils/jwt";
import { useLawyerDetailsQuery } from "@/redux/features/auth/authApi";
import {
  Send,
  Menu,
  X,
  Search,
  Paperclip,
  CheckCheck,
  Clock,
  User,
  MessageSquare,
  Loader2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function formatMessageTime(dateStr?: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

function formatConversationDate(dateStr?: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) {
      return d.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

function formatDateSeparator(dateStr?: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) return "Today";
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return d.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function ChatContent() {
  const [token, setToken] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const { token: jwtToken, decoded } = JWTDecode();
    if (jwtToken) setToken(jwtToken);
    if (decoded?.id) setCurrentUserId(String(decoded.id));
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const initialReceiverId = searchParams.get("receiverId");

  const {
    conversations,
    messages,
    activeRoom,
    subscribeToUser,
    sendMessage,
    isReady,
  } = useChatSocket(token);

  const [currentReceiver, setCurrentReceiver] = useState<string | null>(
    initialReceiverId || null
  );
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Image upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastSubscribedRef = useRef<string | null>(null);

  // Fetch receiver details if it's a lawyer or user profile
  const { data: lawyerDetailsData } = useLawyerDetailsQuery(currentReceiver, {
    skip: !currentReceiver,
  });

  // Keep subscription in sync with initialReceiverId
  useEffect(() => {
    if (initialReceiverId && isReady) {
      if (lastSubscribedRef.current !== initialReceiverId) {
        lastSubscribedRef.current = initialReceiverId;
        setCurrentReceiver(initialReceiverId);
        subscribeToUser(initialReceiverId);
      }
    }
  }, [initialReceiverId, isReady, subscribeToUser]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentReceiver]);

  const handleSelectUser = (receiverId: string) => {
    if (!receiverId) return;
    if (receiverId === currentReceiver) {
      setIsSidebarOpen(false);
      return;
    }

    lastSubscribedRef.current = receiverId;
    setCurrentReceiver(receiverId);
    subscribeToUser(receiverId);

    const url = new URL(window.location.href);
    url.searchParams.set("receiverId", receiverId);
    router.replace(url.toString());

    setIsSidebarOpen(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async () => {
    if (!currentReceiver) return;
    if (!input.trim() && !selectedFile) return;

    let fileUrl = "";
    if (selectedFile) {
      try {
        setIsUploading(true);
        const res = await uploadImage(selectedFile);
        fileUrl =
          res?.data?.fileUrl ||
          res?.data?.url ||
          res?.fileUrl ||
          res?.url ||
          (typeof res === "string" ? res : "");
      } catch (err) {
        console.error("Failed to upload image:", err);
      } finally {
        setIsUploading(false);
        handleRemoveFile();
      }
    }

    sendMessage(currentReceiver, input.trim(), fileUrl);
    setInput("");
  };

  // Find active conversation details
  const activeConversation = useMemo(() => {
    return conversations?.find(
      (c) =>
        (currentReceiver &&
          (String(c?.partner?.id) === String(currentReceiver) ||
            String(c?.partner?._id) === String(currentReceiver))) ||
        (activeRoom && c?.roomId === activeRoom)
    );
  }, [conversations, currentReceiver, activeRoom]);

  const activePartner = useMemo(() => {
    if (activeConversation?.partner) {
      return {
        id:
          activeConversation.partner.id ||
          activeConversation.partner._id ||
          currentReceiver,
        fullName: activeConversation.partner.fullName || "User",
        profileImage:
          activeConversation.partner.profileImage ||
          "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png",
        role: lawyerDetailsData?.data?.role || "Legal Advisor",
      };
    }
    if (lawyerDetailsData?.data) {
      return {
        id: lawyerDetailsData.data._id || currentReceiver,
        fullName: lawyerDetailsData.data.fullName || "User",
        profileImage:
          lawyerDetailsData.data.profileImage ||
          "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png",
        role: lawyerDetailsData.data.role || "Legal Advisor",
      };
    }
    if (currentReceiver) {
      return {
        id: currentReceiver,
        fullName: "Lawyer / User",
        profileImage:
          "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png",
        role: "Legal Advisor",
      };
    }
    return null;
  }, [activeConversation, lawyerDetailsData, currentReceiver]);

  // Filter conversations by search query
  const filteredConversations = useMemo(() => {
    if (!conversations || !Array.isArray(conversations)) return [];
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter(
      (c) =>
        c?.partner?.fullName?.toLowerCase().includes(q) ||
        c?.lastMessage?.content?.toLowerCase().includes(q)
    );
  }, [conversations, searchQuery]);

  // Synthetic item if current receiver is not yet in conversation list
  const isCurrentReceiverInList = useMemo(() => {
    if (!currentReceiver) return true;
    return conversations?.some(
      (c) =>
        String(c?.partner?.id) === String(currentReceiver) ||
        String(c?.partner?._id) === String(currentReceiver)
    );
  }, [conversations, currentReceiver]);

  // Chronologically sorted messages (oldest to newest)
  const orderedMessages = useMemo(() => {
    if (!messages || !Array.isArray(messages)) return [];
    return [...messages].sort(
      (a, b) =>
        new Date(a.createdAt || 0).getTime() -
        new Date(b.createdAt || 0).getTime()
    );
  }, [messages]);

  return (
    <div className="max-w-7xl mx-auto my-2 md:my-5 px-2 sm:px-4">
      {/* Main Chat Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden flex h-[calc(100vh-140px)] min-h-[620px] relative">
        {/* Mobile backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity"
          />
        )}

        {/* Conversations Sidebar */}
        <aside
          className={`
            bg-slate-50/70 border-r border-slate-200/80 flex flex-col shrink-0
            w-[320px] sm:w-[350px] lg:w-[360px] xl:w-[380px]
            fixed lg:static top-0 left-0 h-full z-50 lg:z-10
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-200/70 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h1 className="font-bold text-slate-900 text-lg leading-tight">
                    Messages
                  </h1>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        isReady ? "bg-emerald-500" : "bg-amber-400 animate-pulse"
                      }`}
                    />
                    <span>{isReady ? "Live Socket Active" : "Connecting..."}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close sidebar"
              >
                <X size={22} />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100/90 border border-transparent rounded-xl focus:bg-white focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {/* Show synthetic item if user came with receiverId not yet in conversation list */}
            {!isCurrentReceiverInList && currentReceiver && activePartner && (
              <div
                onClick={() => handleSelectUser(currentReceiver)}
                className="relative flex items-center gap-3.5 px-4 py-3.5 cursor-pointer border-l-4 border-l-primary bg-primary/10 transition-colors"
              >
                <div className="relative shrink-0">
                  <Image
                    src={activePartner.profileImage}
                    width={46}
                    height={46}
                    alt={activePartner.fullName}
                    unoptimized
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <p className="font-semibold text-slate-900 text-sm truncate">
                      {activePartner.fullName}
                    </p>
                    <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
                      New
                    </span>
                  </div>
                  <p className="text-xs text-primary/80 truncate">
                    Ready to start conversation
                  </p>
                </div>
              </div>
            )}

            {filteredConversations.length > 0 ? (
              filteredConversations.map((c) => {
                const partnerId = c?.partner?.id || c?.partner?._id;
                const isSelected =
                  (c.roomId && c.roomId === activeRoom) ||
                  (currentReceiver &&
                    partnerId &&
                    String(partnerId) === String(currentReceiver));

                return (
                  <div
                    key={c.roomId || partnerId}
                    onClick={() => handleSelectUser(partnerId)}
                    className={`group relative flex items-center gap-3.5 px-4 py-3.5 cursor-pointer border-l-4 transition-all duration-150 ${
                      isSelected
                        ? "border-l-primary bg-primary/10 text-slate-900 shadow-xs"
                        : "border-l-transparent hover:bg-slate-100/70 text-slate-700"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <Image
                        src={
                          c?.partner?.profileImage ||
                          "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png"
                        }
                        width={46}
                        height={46}
                        alt={c?.partner?.fullName || "Contact"}
                        unoptimized
                        className={`w-11 h-11 rounded-full object-cover ring-2 transition-all ${
                          isSelected
                            ? "ring-primary/40 shadow-xs"
                            : "ring-slate-200 group-hover:ring-slate-300"
                        }`}
                      />
                      {c?.isActive && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <p
                          className={`text-sm truncate ${
                            isSelected
                              ? "font-semibold text-slate-900"
                              : "font-medium text-slate-800"
                          }`}
                        >
                          {c?.partner?.fullName || "Unknown"}
                        </p>
                        {c?.lastMessage?.createdAt && (
                          <span className="text-[11px] text-slate-400 shrink-0 ml-1">
                            {formatConversationDate(c.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-slate-500 truncate">
                          {c?.lastMessage?.fileUrl && !c?.lastMessage?.content
                            ? "📎 Attachment"
                            : c?.lastMessage?.content || "No messages yet"}
                        </p>
                        {c?.unreadCount > 0 && (
                          <span className="shrink-0 flex items-center justify-center bg-primary text-white font-bold text-[10px] min-w-5 h-5 px-1.5 rounded-full shadow-xs">
                            {c.unreadCount > 99 ? "99+" : c.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                  <Search size={22} />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {searchQuery ? "No matching conversations" : "No conversations yet"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {searchQuery
                    ? "Try searching for a different name or message"
                    : "When you message an attorney or client, chats appear here."}
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Chat Main Area */}
        <main className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden relative">
          {currentReceiver && activePartner ? (
            <>
              {/* Chat Top Header */}
              <div className="h-18 px-4 sm:px-6 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0 shadow-xs z-10">
                <div className="flex items-center gap-3">
                  {/* Mobile Menu Trigger */}
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                    aria-label="Open conversation sidebar"
                  >
                    <Menu size={22} />
                  </button>

                  {/* Partner Avatar & Info */}
                  <div className="relative">
                    <Image
                      src={activePartner.profileImage}
                      width={44}
                      height={44}
                      alt={activePartner.fullName}
                      unoptimized
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20 shadow-xs"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-semibold text-slate-900 text-base leading-tight">
                        {activePartner.fullName}
                      </h2>
                      <ShieldCheck size={16} className="text-primary" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <span className="capitalize">{activePartner.role}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-emerald-600 font-medium">Online</span>
                    </p>
                  </div>
                </div>

                {/* Right Header Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/lawyers/${activePartner.id}`}
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-primary/40 hover:text-primary text-slate-700 bg-white transition-all shadow-xs"
                  >
                    <User size={14} />
                    <span>View Profile</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </Link>
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {orderedMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <MessageSquare size={32} />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-base">
                      Start of conversation with {activePartner.fullName}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      Messages sent here are secure and private. Introduce your legal consultation or inquire about legal services.
                    </p>
                  </div>
                ) : (
                  orderedMessages.map((m, index) => {
                    const isMe =
                      m.senderId === "self" ||
                      (currentUserId && String(m.senderId) === String(currentUserId)) ||
                      (currentReceiver && String(m.senderId) !== String(currentReceiver));

                    // Show date divider if day changes
                    const prevMsg = orderedMessages[index - 1];
                    const currentDate = m.createdAt
                      ? new Date(m.createdAt).toDateString()
                      : "";
                    const prevDate = prevMsg?.createdAt
                      ? new Date(prevMsg.createdAt).toDateString()
                      : "";
                    const showDateSeparator = currentDate && currentDate !== prevDate;

                    const attachedUrl = Array.isArray(m?.fileUrl)
                      ? m.fileUrl[0]
                      : typeof m?.fileUrl === "string"
                      ? m.fileUrl
                      : "";

                    return (
                      <div key={m.tempId || m._id || index} className="space-y-3">
                        {showDateSeparator && (
                          <div className="flex items-center justify-center my-4">
                            <span className="bg-slate-200/80 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-full shadow-xs">
                              {formatDateSeparator(m.createdAt)}
                            </span>
                          </div>
                        )}

                        <div
                          className={`flex items-end gap-2 ${
                            isMe ? "justify-end" : "justify-start"
                          }`}
                        >
                          {/* Received avatar */}
                          {!isMe && (
                            <Image
                              src={activePartner.profileImage}
                              width={28}
                              height={28}
                              alt={activePartner.fullName}
                              unoptimized
                              className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                            />
                          )}

                          <div
                            className={`flex flex-col ${
                              isMe ? "items-end" : "items-start"
                            } max-w-[85%] sm:max-w-[70%]`}
                          >
                            <div
                              className={`p-3.5 text-sm leading-relaxed transition-all ${
                                isMe
                                  ? "bg-gradient-to-r from-primary to-[#235870] text-white rounded-2xl rounded-br-xs shadow-sm"
                                  : "bg-white text-slate-900 border border-slate-200/80 rounded-2xl rounded-bl-xs shadow-xs"
                              }`}
                            >
                              {/* Attached Image */}
                              {attachedUrl && (
                                <div className="mb-2">
                                  <Image
                                    src={attachedUrl}
                                    alt="Attachment"
                                    width={320}
                                    height={220}
                                    unoptimized
                                    onClick={() => setPreviewModalUrl(attachedUrl)}
                                    className="rounded-xl max-h-64 w-auto object-cover cursor-pointer hover:opacity-90 transition-opacity border border-black/5"
                                  />
                                </div>
                              )}

                              {/* Message text */}
                              {m?.content && (
                                <div className="break-words whitespace-pre-wrap font-normal">
                                  {m.content}
                                </div>
                              )}
                            </div>

                            {/* Message Timestamp & Status */}
                            <div
                              className={`flex items-center gap-1 mt-1 px-1 text-[11px] ${
                                isMe ? "text-slate-400" : "text-slate-400"
                              }`}
                            >
                              <span>{formatMessageTime(m.createdAt)}</span>
                              {isMe && (
                                <span>
                                  {m.isTemp ? (
                                    <Clock size={12} className="animate-pulse" />
                                  ) : (
                                    <CheckCheck size={14} className="text-primary" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80 shrink-0">
                {/* File preview chip */}
                {filePreview && (
                  <div className="mb-2.5 flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl w-fit max-w-full">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-200 relative">
                      <Image
                        src={filePreview}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs truncate max-w-[200px]">
                      <p className="font-medium text-slate-800 truncate">
                        {selectedFile?.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {selectedFile
                          ? `${(selectedFile.size / 1024).toFixed(0)} KB`
                          : ""}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded-md transition-colors"
                      title="Remove attachment"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {/* Image attachment button */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="p-2.5 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                    title="Attach image"
                  >
                    <Paperclip size={20} />
                  </button>

                  {/* Message Input */}
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder={`Write a message to ${activePartner.fullName}...`}
                    disabled={isUploading}
                    className="flex-1 py-3 px-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                  />

                  {/* Send Button */}
                  <button
                    disabled={(!input.trim() && !selectedFile) || isUploading}
                    onClick={handleSend}
                    className="px-5 py-3 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    {isUploading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span className="hidden sm:inline text-xs font-semibold">
                          Send
                        </span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State - No receiver selected */
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-5 shadow-sm">
                <MessageSquare size={38} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Your Legal Messages
              </h2>
              <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
                Select a conversation from the sidebar on the left, or contact a lawyer from their profile page to begin consultation.
              </p>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-primary/90 transition-colors"
              >
                <Menu size={18} />
                <span>Open Conversations</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Image Preview Modal */}
      {previewModalUrl && (
        <div
          onClick={() => setPreviewModalUrl(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2"
          >
            <button
              onClick={() => setPreviewModalUrl(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <Image
              src={previewModalUrl}
              alt="Enlarged attachment"
              width={1200}
              height={800}
              unoptimized
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto my-6 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 size={36} className="text-primary animate-spin mb-3" />
          <p className="text-slate-500 text-sm">Loading messages...</p>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
