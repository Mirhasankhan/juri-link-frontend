"use client";

import { useChatSocket } from "@/components/message/user.chat.socket";
import { JWTDecode } from "@/utils/jwt";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ChatPage() {
  const { token } = JWTDecode();
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

  const [currentReceiver, setCurrentReceiver] = useState<string | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (initialReceiverId && isReady) {
      setCurrentReceiver(initialReceiverId);
      subscribeToUser(initialReceiverId);
    }
  }, [initialReceiverId, isReady, subscribeToUser]);

  const handleSelectUser = (receiverId: string) => {
    if (!receiverId) return;
    setCurrentReceiver(receiverId);
    subscribeToUser(receiverId);

    const url = new URL(window.location.href);
    url.searchParams.set("receiverId", receiverId);
    router.replace(url.toString());
  };

  const handleSend = () => {
    if (currentReceiver && input.trim()) {
      sendMessage(currentReceiver, input, "");
      setInput("");
    }
  };

  console.log(conversations);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="md:w-1/3 lg:w-1/4 xl:w-1/5 border-r bg-white overflow-y-auto">
        <h2 className="p-4 font-semibold text-lg border-y">Conversations</h2>
        {conversations?.map((c) => (
          <div
            key={c.roomId}
            className={`p-3 cursor-pointer hover:bg-gray-200 ${
              c.roomId === activeRoom ? "bg-gray-600" : ""
            }`}
            onClick={() => handleSelectUser(c?.partner.id)}
          >
            <div className="flex items-center gap-3">
              <Image
                src={
                  c?.partner?.profileImage ||
                  "https://images.unsplash.com/photo-1761839256602-0e28a5ab928d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                }
                width={40}
                height={40}
                alt={c?.partner?.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{c?.partner?.fullName}</p>
                  {c?.unreadCount > 0 && (
                    <div className="flex items-center justify-center bg-red-500 text-white font-semibold text-xs w-6 h-6 rounded-full shadow-md">
                      {c?.unreadCount > 99 ? "99+" : c?.unreadCount}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {c?.lastMessage?.content || "No messages"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 max-h-[80vh] overflow-y-auto p-4">
          {messages
            ?.slice()
            ?.reverse()
            ?.map((m, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  m.senderId === currentReceiver
                    ? "text-left"
                    : "text-right text-white"
                }`}
              >
                <div
                  className={`inline-block px-4 py-3 ${
                    m.senderId === currentReceiver
                      ? "bg-gray-200 rounded-b-[16px] rounded-tr-[16px]"
                      : "bg-gradient-to-br from-primary p-2 to-primary/50 rounded-t-[16px] rounded-br-[16px]"
                  }`}
                >
                  <div className="font-medium">
                    {m?.content || "📎 File sent"}
                  </div>
                  {m?.fileUrl?.length > 0 && (
                    <img
                      src={m.fileUrl || "/avatar.png"}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </div>
                <div className="text-xs pt-1 text-gray-500">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded"
          />
          <button
            disabled={!input}
            onClick={handleSend}
            className="px-8 py-4 bg-blue-600 text-white rounded-[12px]"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
