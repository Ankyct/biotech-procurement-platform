import { useCallback, useEffect, useRef, useState } from "react";
import {Client, type IMessage} from "@stomp/stompjs";

export type Status = "JOIN" | "MESSAGE" | "LEAVE";


export interface ChatMessage {
    senderName: string;
    recieverName?: string;
    message?: string;
    date?: string;
    status: Status;
}

const WS_URL = "ws://localhost:8080/ws";

export function useChat(username: string | null){
    const [connected, setConnected] = useState(false);
    const [publicMessages, setPublicMessages] = useState<ChatMessage[]>([]);
    const [privateChats, setPrivateChats] = useState<Record<string, ChatMessage[]>>({});
    const [participants, setParticipants] = useState<string[]>([]);
    const clientRef = useRef<Client | null>(null);

    const addPrivate = (otherUser: string, msg: ChatMessage) =>
    setPrivateChats((prev) => ({
      ...prev,
      [otherUser]: [...(prev[otherUser] ?? []), msg],
    }));
    const addParticipant = (name:string)=>
        setParticipants((prev)=>(prev.includes(name) ? prev: [...prev, name]));

    useEffect(() => {
    if (!username) return;

    const client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);

        client.subscribe("/chatroom/public", (frame: IMessage) => {
          const msg: ChatMessage = JSON.parse(frame.body);
          if (msg.senderName !== username) addParticipant(msg.senderName);
          setPublicMessages((prev) => [...prev, msg]);
        });

        client.subscribe(`/user/${username}/private`, (frame: IMessage) => {
          const msg: ChatMessage = JSON.parse(frame.body);
          addParticipant(msg.senderName);
          addPrivate(msg.senderName, msg);
        });

        client.publish({
          destination: "/app/message",
          body: JSON.stringify({ senderName: username, status: "JOIN" }),
        });
      },
      onWebSocketClose: () => setConnected(false),
      onStompError: (frame) => console.error("STOMP error", frame.headers["message"]),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (client.connected) {
        client.publish({
          destination: "/app/message",
          body: JSON.stringify({ senderName: username, status: "LEAVE" }),
        });
      }
      client.deactivate();
    };
  }, [username]);

  const sendPublic = useCallback(
    (text: string) => {
      if (!username || !text.trim() || !clientRef.current?.connected) return;
      clientRef.current.publish({
        destination: "/app/message",
        body: JSON.stringify({
          senderName: username,
          message: text.trim(),
          date: new Date().toISOString(),
          status: "MESSAGE",
        }),
      });
    },
    [username]
  );

  const sendPrivate = useCallback(
    (to: string, text: string) => {
      if (!username || !text.trim() || !clientRef.current?.connected) return;
      const msg: ChatMessage = {
        senderName: username,
        recieverName: to,
        message: text.trim(),
        date: new Date().toISOString(),
        status: "MESSAGE",
      };
      clientRef.current.publish({
        destination: "/app/private-message",
        body: JSON.stringify(msg),
      });
      // The backend only delivers to the receiver, so add our own copy locally
      addPrivate(to, msg);
    },
    [username]
  );

  return {
    connected,
    publicMessages,
    privateChats,
    participants,
    sendPublic,
    sendPrivate,
    startPrivateChat: addParticipant,
  };
}
