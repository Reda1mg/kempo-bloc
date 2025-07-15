'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
    setRole((localStorage.getItem('role') || '').toUpperCase());
  }, []);

  if (role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500 text-2xl font-bold">
        Accès refusé : Vous n&apos;êtes pas administrateur.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#232526] py-12">
      <h1 className="text-4xl font-extrabold text-yellow-300 mb-8">Espace Administrateur</h1>
      <div className="bg-[#181818] rounded-xl shadow-lg p-8 w-full max-w-2xl flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-yellow-200 mb-2">Bienvenue, {username} !</h2>
          <p className="text-yellow-100">Vous avez accès aux outils d&apos;administration.</p>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/admin/users"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all text-center"
          >
            Gérer les utilisateurs
          </Link>
          <button
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all"
          >
            Voir les logs système
          </button>
        </div>
        <div className="mt-6 text-yellow-100 text-sm text-center opacity-70">
          Cette page est réservée aux administrateurs. Ajoutez ici vos outils d&apos;admin personnalisés.
        </div>
      </div>
    </div>
  );
}
