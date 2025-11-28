"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Booking = {
  uuid: string;
  job_description: string;
  date: string;
  status: string;
  job_address: string;
  billing_address: string;
  work_done_description: string;
  attachments?: { id: string; name: string; url: string }[];

};

type Message = {
  sender: string;
  message: string;
  timestamp: string;
};

export default function BookingDetail() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("Customer");

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    console.log(user);
    
    fetch("http://localhost:3304/api/bookings")
      .then(res => res.json())
      .then((data: Booking[]) => {
        console.log(data);
        const b = data.find(job => job.uuid === params.uuid);
        console.log(b);
        setBooking(b || null);
      });
  }, [params.uuid]);

  useEffect(() => {
    if (!params.uuid) return;

    fetch(`http://localhost:3304/api/bookings/${params.uuid}/messages`)
      .then(res => res.json())
      .then((data: Message[]) => setMessages(data));
  }, [params.uuid]);

  
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const response = await fetch(`http://localhost:3304/api/bookings/${params.uuid}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: user, message: newMessage })
    });

    if (response.ok) {
      // Optimistically update UI
      setMessages(prev => [...prev, { sender: user, message: newMessage, timestamp: new Date().toISOString() }]);
      setNewMessage("");
    }
  };

  if (!booking) return <p>Loading...</p>;
  console.log(booking);
  return (
    <div>
      <button onClick={() => router.push("/bookings")}>← Back to Bookings</button>
      <h1>{booking.job_description}</h1>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Address:</strong> {booking.job_address}</p>
      <p><strong>Billing Address:</strong> {booking.billing_address}</p>
      <p><strong>Work Description:</strong> {booking.work_done_description}</p>

      <h2>Attachments</h2>
        {!booking.attachments || booking.attachments.length === 0 ? (
          <p>No attachments</p>
        ) : (
          <ul>
            {booking.attachments.map(att => (
              <li key={att.id}>
                <a href={att.url} target="_blank" rel="noopener noreferrer">{att.name}</a>
              </li>
            ))}
          </ul>
        )}

      <h2>Messages</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", maxHeight: "300px", overflowY: "auto" }}>
        {messages.length === 0 ? <p>No messages yet.</p> :
          messages.map((m, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <strong>{m.sender}</strong> <em>({new Date(m.timestamp).toLocaleString()})</em>:<br />
              {m.message}
            </div>
          ))
        }
      </div>

      <div style={{ marginTop: "10px" }}>
        <textarea
          rows={3}
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "100%" }}
        />
        <button onClick={handleSendMessage} style={{ marginTop: "5px" }}>Send Message</button>
      </div>
    </div>
  );
}
