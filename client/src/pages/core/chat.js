import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { useAuth } from "../../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const receiverId = 2; // Replace with dynamic user selection

  useEffect(() => {
    if (!user) return;

    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/messages/${user.id}/${receiverId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Pusher Real-time Listener
    const pusher = new Pusher("your-app-key", {
      cluster: "mt1",
      encrypted: true,
    });

    const channel = pusher.subscribe("chat-channel");
    channel.bind("new-message", (data) => {
      if (
        (data.sender_id === user.id && data.receiver_id === receiverId) ||
        (data.sender_id === receiverId && data.receiver_id === user.id)
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [user, receiverId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/send-message",
        {
          sender_id: user.id,
          receiver_id: receiverId,
          text: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h2>Chat with User {receiverId}</h2>
      <div>
        {messages.map((msg) => (
          <p
            key={msg.id}
            style={{
              textAlign: msg.sender_id === user?.id ? "right" : "left",
              color: msg.sender_id === user?.id ? "blue" : "green",
            }}
          >
            {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
