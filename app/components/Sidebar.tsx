'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('username');
    const role = localStorage.getItem('role') || localStorage.getItem('Role');
    const id = localStorage.getItem('userId');

    if (user) setUsername(user);
    if (role) setRole(role.toUpperCase());
    if (id) setUserId(id);

    // ✅ Console debug
    console.log('User role:', role?.toUpperCase());
    console.log('User ID:', id);
  }, []);

  return (
    <div className="w-64 min-h-screen p-6 flex flex-col justify-between bg-gradient-to-b from-[#181818] via-[#232526] to-[#181818] shadow-2xl border-r-4 border-black">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <img src="/kempo-logo.png" alt="Kempo Logo" className="w-12 h-12 rounded-full shadow-lg border-2 border-yellow-400 bg-white" />
          <h2 className="text-3xl font-extrabold tracking-wide text-yellow-300 drop-shadow">Kempo</h2>
        </div>
        <ul className="space-y-3">
          <li>
            <Link href="/" className="block px-4 py-2 rounded-lg transition-all duration-200 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-300 font-semibold">
              Accueil
            </Link>
          </li>

          {!username && (
            <>
              <li>
                <Link href="/register" className="block px-4 py-2 rounded-lg transition-all duration-200 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-300 font-semibold">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/login" className="block px-4 py-2 rounded-lg transition-all duration-200 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-300 font-semibold">
                  Connexion
                </Link>
              </li>
            </>
          )}
     
          {username && (
            <>
              <li>
                <Link href="/tournoi" className="block px-4 py-2 rounded-lg transition-all duration-200 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-300 font-semibold">
                  Tournoi
                </Link>
              </li>
              <li>
                <Link href="/competiteur" className="block px-4 py-2 rounded-lg transition-all duration-200 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-300 font-semibold">
                  Compétiteur
                </Link>
              </li>
            </>
          )}

          {role === 'ADMIN' && (
            <li>
              <Link href="/admin" className="block px-4 py-2 rounded-lg transition-all duration-200 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-300 font-semibold">
                Admin
              </Link>
            </li>
          )}
               <li>
            <Link
              href="/support"
              className="block px-4 py-2 rounded-lg transition-all duration-200 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-300 font-semibold"
            >
              Support
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-10 flex flex-col justify-end h-full gap-2">
        {username && (
          <button
            onClick={() => {
              localStorage.removeItem('userId');
              localStorage.removeItem('username');
              localStorage.removeItem('role');
              window.location.href = '/login';
            }}
            className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-yellow-100 hover:bg-yellow-600/20 hover:text-yellow-300 font-semibold cursor-pointer"
          >
            Déconnexion
          </button>
        )}

        <div className="bg-[#232526]/80 rounded-xl px-4 py-3 shadow-inner border border-black flex items-center gap-2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-300">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs text-yellow-100">
            {username ? (
              <>Connecté en tant que <span className="font-semibold text-yellow-300">{username}</span></>
            ) : (
              'Non connecté'
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
