"use client";

import { useChatSocket } from "@/components/message/user.chat.socket";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatPage() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGMzNTcxMTU0YjljZTA4ZDZhYjk0OCIsImVtYWlsIjoibWlyaGFzYW4wMDAwMzRAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJ1c2VyTmFtZSI6Ik1pciBIYXNhbiIsImlhdCI6MTc2Mjc4NDQ5OSwiZXhwIjoxNzY0MDgwNDk5fQ.dq-fg098VlHl3YyhpYboP9rYchAefgFlUL7_QRVr9e0";
  const { conversations, messages, activeRoom, subscribeToUser, sendMessage } =
    useChatSocket(token);

  const [currentReceiver, setCurrentReceiver] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const handleSelectUser = (receiverId: string) => {
    setCurrentReceiver(receiverId);
    subscribeToUser(receiverId);
  };

  const handleSend = () => {
    if (currentReceiver && input.trim()) {
      sendMessage(
        currentReceiver,
        input,
        ""
      );
      setInput("");
    }
  };

  console.log("conv", messages);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="md:w-1/3 lg:w-1/4 xl:w-1/5 border-r bg-white overflow-y-auto">
        <h2 className="p-4 font-semibold text-lg border-y">Conversations</h2>
        {conversations.map((c) => (
          <div
            key={c.roomId}
            className={`p-3 cursor-pointer hover:bg-gray-200 ${
              c.roomId === activeRoom ? "bg-gray-200" : ""
            }`}
            onClick={() => handleSelectUser(c.partner.id)}
          >
            <div className="flex items-center gap-3">
              <img
                src={c.partner.profileImage || "/avatar.png"}
                alt={c.partner.userName}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium flex gap-3  justify-between">
                  <p>{c.partner.userName}</p>
                  <p>
                    {c.unreadCount > 0 && (
                      <div className="font-medium bg-red-500">
                        {c.unreadCount}
                      </div>
                    )}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {c.lastMessage?.content || "No messages"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
                      : "bg-gradient-to-br from-primary p-2  to-primary/50 rounded-t-[16px] rounded-br-[16px]"
                  }`}
                >
                  <div className="font-medium">
                    {m.content || "📎 File sent"}
                  </div>
                  {m.fileUrl && (
                    <img
                      src={m.fileUrl || "/avatar.png"}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </div>
                <div className=" text-xs pt-1 text-gray-500">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            ))}
        </div>
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
            <Send></Send>
          </button>
        </div>
      </div>
    </div>
  );
}
