import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  


  const receiverId = user.id
   
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;
      const { data } = await axios.get(`http://127.0.0.1:8000/api/messages/${receiverId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessages(data);
    };

    fetchMessages();
  }, [receiverId, user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/messages",
      { receiver_id: receiverId, message: newMessage },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    setMessages([...messages, data]);
    setNewMessage("");
  };

  return (
    <div>
      <h2>Chat with User {receiverId}</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg.id} style={{ textAlign: msg.sender_id === user?.id ? "right" : "left" }}>
            {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
