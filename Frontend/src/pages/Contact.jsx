// src/pages/Contact.jsx
import React, { useState } from "react";
import { sendContactMessage } from "../Services/contactService";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="pt-24 px-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full p-3 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Your email" className="w-full p-3 border rounded" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message" rows={6} className="w-full p-3 border rounded" />

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Send Message
        </button>

        {status === "success" && <p className="text-green-600">Message sent — thank you!</p>}
        {status === "error" && <p className="text-red-600">Failed to send. Try again later.</p>}
      </form>
    </div>
  );
}
