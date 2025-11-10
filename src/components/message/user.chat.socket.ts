import { useEffect, useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; 

interface Message {
  type: string;
  [key: string]: any;
}

export const useChatSocket = (token: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
 
  const activeRoomRef = useRef<string | null>(null);
  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  const connect = useCallback(() => {
    if (!token) return;

    const ws = new WebSocket(`ws://72.60.125.50:5003?x-token=${token}`);

    ws.onopen = () => {
      console.log("✅ Connected to chat server");
    };

    ws.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      switch (data.type) {
        case "member-conversation":
          setConversations(data.conversations);
          break;

        case "past-messages":
          setMessages(data.messages);
          setActiveRoom(data.roomId);
          break;

        case "member-new-message":
          if (data.roomId === activeRoomRef.current) {
            setMessages((prev) => {
              // 🧩 Remove any temp message that matches content to prevent duplicates
              const filtered = prev.filter(
                (m) =>
                  !(m.isTemp && m.content === data.message.content)
              );
              return [data.message, ...filtered];
            });
          } else {
            console.log("💬 New message for another room:", data.roomId);
          }
          break;

        case "error":
          console.error("❌", data.message);
          break;

        default:
          console.log("⚠️ Unknown event:", data);
      }
    };

    ws.onclose = () => {
      console.log("🔌 Disconnected from chat server");
      // Reconnect automatically after 5 seconds
      setTimeout(connect, 5000);
    };

    setSocket(ws);
  }, [token]);

  useEffect(() => {
    connect();
    return () => {
      socket?.close();
    };
  }, [token]);

  const subscribeToUser = (receiverId: string) => {
    socket?.send(JSON.stringify({ type: "member-subscribe", receiverId }));
    setActiveRoom(receiverId);
  };

  const sendMessage = (
    receiverId: string,
    content: string,
    fileUrl?: string
  ) => {
    if (!activeRoomRef.current) {
      console.warn("Not subscribed to any room");
      return;
    }

    const tempMessage = {
      tempId: uuidv4(), // 🆕 unique ID for optimistic message
      senderId: "self",
      content,
      fileUrl,
      isTemp: true,
    };

    // 🧠 Optimistically add message to UI
    setMessages((prev) => [tempMessage, ...prev]);

    // 📨 Send to server
    socket?.send(
      JSON.stringify({
        type: "member-send-message",
        receiverId,
        content,
        fileUrl,
      })
    );
  };

  return {
    socket,
    conversations,
    messages,
    activeRoom,
    subscribeToUser,
    sendMessage,
  };
};
