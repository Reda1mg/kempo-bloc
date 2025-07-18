'use client';

import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    const res = await fetch('/api/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setStatus('Votre message a bien été envoyé. Merci !');
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus('Erreur lors de l\'envoi. Merci de réessayer plus tard.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white text-black p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Support - Contactez-nous</h1>
      
      {/* Ticket button */}
      <a
        href="https://redareada6.atlassian.net/servicedesk/customer/portal/3"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mb-6 bg-green-600 text-white p-2 rounded text-center font-semibold hover:bg-green-700 transition"
      >
        Créer un ticket (Jira Service Desk)
      </a>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="subject"
          placeholder="Objet"
          value={form.subject}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Votre message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
      </form>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}
