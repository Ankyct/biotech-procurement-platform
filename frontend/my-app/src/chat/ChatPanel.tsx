import { useState } from "react";
import { useChat } from "./useChat";

const PUBLIC = "__public__";

export default function ChatPanel() {
  const [nameInput, setNameInput] = useState("");
  const [username, setUsername] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(PUBLIC);
  const [text, setText] = useState("");
  const [newChatName, setNewChatName] = useState("");

  const {
    connected, publicMessages, privateChats, participants,
    sendPublic, sendPrivate, startPrivateChat,
  } = useChat(username);

  if (!username) {
    return (
      <div>
        <input
          placeholder="Choose a username"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && nameInput.trim() && setUsername(nameInput.trim())}
        />
        <button onClick={() => nameInput.trim() && setUsername(nameInput.trim())}>Join</button>
      </div>
    );
  }

  const submit = () => {
    if (activeTab === PUBLIC) sendPublic(text);
    else sendPrivate(activeTab, text);
    setText("");
  };

  const visible = activeTab === PUBLIC ? publicMessages : privateChats[activeTab] ?? [];

  return (
    <div style={{ width: 360, border: "1px solid #ccc", borderRadius: 8, padding: 8 }}>
      <div style={{ fontSize: 12, color: connected ? "green" : "red" }}>
        {username}: {connected ? "Connected" : "Connecting..."}
      </div>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", margin: "6px 0" }}>
        <button onClick={() => setActiveTab(PUBLIC)} disabled={activeTab === PUBLIC}>Public</button>
        {participants.map((p) => (
          <button key={p} onClick={() => setActiveTab(p)} disabled={activeTab === p}>{p}</button>
        ))}
      </div>

      <div style={{ marginBottom: 6 }}>
        <input
          placeholder="Start private chat with..."
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
        />
        <button
          onClick={() => {
            const name = newChatName.trim();
            if (name && name !== username) {
              startPrivateChat(name);
              setActiveTab(name);
              setNewChatName("");
            }
          }}
        >
          Open
        </button>
      </div>

      <ul style={{ height: 260, overflowY: "auto", listStyle: "none", padding: 0 }}>
        {visible.map((m, i) =>
          m.status === "MESSAGE" ? (
            <li key={i}>
              <b>{m.senderName}</b>: {m.message}
            </li>
          ) : (
            <li key={i} style={{ color: "#888", fontStyle: "italic" }}>
              {m.senderName} {m.status === "JOIN" ? "joined" : "left"}
            </li>
          )
        )}
      </ul>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Type a message..."
      />
      <button onClick={submit} disabled={!connected}>Send</button>
    </div>
  );
}