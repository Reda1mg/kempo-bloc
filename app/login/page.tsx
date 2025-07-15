'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // ✅ Stocker dans le localStorage
      localStorage.setItem('userId', data.id);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role); // stocke le rôle

      console.log('Logged-in user ID:', data.id);
      console.log('Logged-in user role:', data.role); // ✅ console.log pour debug

      router.push('/tournoi');
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded placeholder-black"
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded placeholder-black"
          autoComplete="new-password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
      <div className="mt-3 text-center">
        <a href="/forgot-password" className="text-blue-600 underline">
          Mot de passe oublié ?
        </a>
      </div>
    </div>
  );
}
