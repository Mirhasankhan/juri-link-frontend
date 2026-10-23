import { useEffect, useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

interface Message {
  type: string;
  [key: string]: any;
}

export const useChatSocket = (token: string | null) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [activeReceiver, setActiveReceiver] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const activeRoomRef = useRef<string | null>(null);
  const activeReceiverRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isManuallyClosedRef = useRef(false);

  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  useEffect(() => {
    activeReceiverRef.current = activeReceiver;
  }, [activeReceiver]);

  const connect = useCallback(() => {
    if (!token) return;

    if (socketRef.current) {
      try {
        socketRef.current.close();
      } catch {}
      socketRef.current = null;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL ||
      "ws://api.passit.smtsigma.com:5006";

    try {
      const ws = new WebSocket(
        `${baseUrl}?x-token=${encodeURIComponent(token)}`
      );
      socketRef.current = ws;
      setSocket(ws);

      ws.onopen = () => {
        console.log("✅ Connected to chat server");
        setIsReady(true);
        // If an active receiver is pending, re-subscribe on connection
        if (activeReceiverRef.current) {
          ws.send(
            JSON.stringify({
              type: "member-subscribe",
              receiverId: activeReceiverRef.current,
            })
          );
        }
      };

      ws.onmessage = (event) => {
        try {
          const data: Message = JSON.parse(event.data);

          switch (data.type) {
            case "member-conversation":
              setConversations(data.conversations || []);
              break;

            case "past-messages":
              setMessages(data.messages || []);
              if (data.roomId) {
                setActiveRoom(data.roomId);
                activeRoomRef.current = data.roomId;
              }
              break;

            case "member-new-message": {
              const incoming = data.message;
              const currentRoom = activeRoomRef.current;
              const currentRecv = activeReceiverRef.current;

              const matchesRoom = Boolean(
                data.roomId && currentRoom && data.roomId === currentRoom
              );
              const matchesReceiver = Boolean(
                currentRecv &&
                  (String(incoming?.senderId) === String(currentRecv) ||
                    String(incoming?.receiverId) === String(currentRecv))
              );

              if (matchesRoom || matchesReceiver) {
                setMessages((prev) => {
                  const filtered = prev.filter((m) => {
                    if (!m.isTemp) return true;
                    if (
                      m.tempId &&
                      incoming.tempId &&
                      m.tempId === incoming.tempId
                    ) {
                      return false;
                    }
                    if (
                      m.content &&
                      incoming.content &&
                      m.content === incoming.content
                    ) {
                      return false;
                    }
                    if (m.fileUrl && incoming.fileUrl) {
                      const mUrl = Array.isArray(m.fileUrl)
                        ? m.fileUrl[0]
                        : m.fileUrl;
                      const incUrl = Array.isArray(incoming.fileUrl)
                        ? incoming.fileUrl[0]
                        : incoming.fileUrl;
                      if (mUrl && incUrl && mUrl === incUrl) return false;
                    }
                    return true;
                  });

                  // Deduplicate identical message
                  const alreadyExists = filtered.some((m) => {
                    if (
                      m._id &&
                      incoming._id &&
                      String(m._id) === String(incoming._id)
                    ) {
                      return true;
                    }
                    return false;
                  });

                  if (alreadyExists) return filtered;
                  return [incoming, ...filtered];
                });
              }

              // Update conversation list item lastMessage & unread count
              setConversations((prev) => {
                if (!prev || !Array.isArray(prev)) return prev;
                return prev.map((c) => {
                  const partnerId = c?.partner?.id || c?.partner?._id;
                  const isMatchingConvo =
                    c.roomId === data.roomId ||
                    (incoming?.senderId &&
                      String(partnerId) === String(incoming.senderId)) ||
                    (incoming?.receiverId &&
                      String(partnerId) === String(incoming.receiverId));

                  if (isMatchingConvo) {
                    const isCurrentlyActive =
                      (c.roomId && c.roomId === activeRoomRef.current) ||
                      (partnerId &&
                        String(partnerId) === String(activeReceiverRef.current));

                    return {
                      ...c,
                      lastMessage: incoming,
                      unreadCount: isCurrentlyActive
                        ? 0
                        : (c.unreadCount || 0) + 1,
                    };
                  }
                  return c;
                });
              });
              break;
            }

            case "increment_unread": {
              if (data.roomId) {
                setConversations((prev) => {
                  if (!Array.isArray(prev)) return prev;
                  return prev.map((c) => {
                    if (c.roomId === data.roomId) {
                      return {
                        ...c,
                        unreadCount:
                          typeof data.unreadCount === "number"
                            ? data.unreadCount
                            : (c.unreadCount || 0) + 1,
                      };
                    }
                    return c;
                  });
                });
              }
              break;
            }

            case "error":
              console.error("❌ Socket error:", data.message);
              break;

            default:
              console.log("Socket event:", data.type);
          }
        } catch (e) {
          console.error("Error parsing websocket message:", e);
        }
      };

      ws.onclose = () => {
        console.log("🔌 Disconnected from chat server");
        setIsReady(false);
        if (!isManuallyClosedRef.current) {
          reconnectTimeoutRef.current = setTimeout(connect, 4000);
        }
      };
    } catch (err) {
      console.error("Failed to connect chat socket:", err);
    }
  }, [token]);

  useEffect(() => {
    isManuallyClosedRef.current = false;
    connect();

    return () => {
      isManuallyClosedRef.current = true;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        try {
          socketRef.current.close();
        } catch {}
        socketRef.current = null;
      }
    };
  }, [connect]);

  const subscribeToUser = useCallback((receiverId: string) => {
    if (!receiverId) return;

    // Reset current messages when switching conversation to avoid flash
    if (activeReceiverRef.current !== receiverId) {
      setMessages([]);
    }

    setActiveReceiver(receiverId);
    activeReceiverRef.current = receiverId;

    // Fast-path activeRoom from conversations if known
    setConversations((prev) => {
      if (Array.isArray(prev)) {
        const found = prev.find(
          (c) =>
            String(c?.partner?.id) === String(receiverId) ||
            String(c?.partner?._id) === String(receiverId)
        );
        if (found?.roomId) {
          setActiveRoom(found.roomId);
          activeRoomRef.current = found.roomId;
        }
      }
      return prev;
    });

    const sendMsg = (ws: WebSocket) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "member-subscribe", receiverId }));
      }
    };

    if (socketRef.current) {
      if (socketRef.current.readyState === WebSocket.OPEN) {
        sendMsg(socketRef.current);
      } else {
        const ws = socketRef.current;
        const handleOpen = () => {
          sendMsg(ws);
          ws.removeEventListener("open", handleOpen);
        };
        ws.addEventListener("open", handleOpen);
      }
    }
  }, []);

  const sendMessage = useCallback(
    (receiverId: string, content: string, fileUrl?: string) => {
      if (!receiverId) return;
      if (!content?.trim() && !fileUrl) return;

      const tempMessage = {
        tempId: uuidv4(),
        senderId: "self",
        receiverId,
        content: content?.trim() || "",
        fileUrl: fileUrl ? (Array.isArray(fileUrl) ? fileUrl : [fileUrl]) : [],
        isTemp: true,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [tempMessage, ...prev]);

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: "member-send-message",
            receiverId,
            content: content?.trim() || "",
            fileUrl: fileUrl || "",
          })
        );
      }
    },
    []
  );

  return {
    socket,
    conversations,
    messages,
    activeRoom,
    activeReceiver,
    subscribeToUser,
    sendMessage,
    isReady,
  };
};
