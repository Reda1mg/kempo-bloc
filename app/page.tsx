"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedIn(!!localStorage.getItem("userId"));
    }
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#181818] via-[#232526] to-[#181818] p-8">
      <h1 className="text-4xl font-extrabold text-yellow-300 mb-10 drop-shadow-lg">
        Bienvenue sur Kempo Tournament
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {loggedIn && (
          <>
            <Link
              href="/tournoi"
              className="block bg-[#393c4d] hover:bg-[#2c2e3a] text-white rounded-xl shadow-lg p-8 text-center border-2 border-black transition-all duration-200"
            >
              <span className="text-2xl font-bold">Tournois</span>
              <div className="mt-2 text-yellow-200">
                Gérer et consulter vos tournois
              </div>
            </Link>
            <Link
              href="/competiteur"
              className="block bg-[#393c4d] hover:bg-[#2c2e3a] text-white rounded-xl shadow-lg p-8 text-center border-2 border-black transition-all duration-200"
            >
              <span className="text-2xl font-bold">Compétiteurs</span>
              <div className="mt-2 text-yellow-200">
                Voir et ajouter des compétiteurs
              </div>
            </Link>
          </>
        )}
        <Link
          href="/login"
          className="block bg-[#393c4d] hover:bg-[#2c2e3a] text-white rounded-xl shadow-lg p-8 text-center border-2 border-black transition-all duration-200"
        >
          <span className="text-2xl font-bold">Connexion</span>
          <div className="mt-2 text-yellow-200">Se connecter à votre compte</div>
        </Link>
        <Link
          href="/register"
          className="block bg-[#393c4d] hover:bg-[#2c2e3a] text-white rounded-xl shadow-lg p-8 text-center border-2 border-black transition-all duration-200"
        >
          <span className="text-2xl font-bold">Inscription</span>
          <div className="mt-2 text-yellow-200">Créer un nouveau compte</div>
        </Link>
      </div>
      <div className="mt-12 text-yellow-100 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Kempo Tournament. Tous droits réservés.
      </div>
    </div>
  );
}
