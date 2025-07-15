'use client';

import { useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
  role: string;
};

export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/user');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs.');
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id: number, newRole: string) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la mise à jour du rôle');
      }

      const updated = await res.json();
      setUsers(users.map(u => (u.id === id ? { ...u, role: updated.role } : u)));
    } catch (err) {
      alert('Erreur : impossible de mettre à jour le rôle.');
    }
  };

  if (loading) return <p className="text-white p-4">Chargement...</p>;
  if (error) return <p className="text-red-600 p-4">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-300 mb-6">Gestion des utilisateurs</h1>
      <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-900 text-yellow-400">
          <tr>
            <th className="py-2 px-4 text-left">Nom d'utilisateur</th>
            <th className="py-2 px-4 text-left">Rôle</th>
            <th className="py-2 px-4 text-left">Modifier le rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t border-gray-700">
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.role}</td>
              <td className="py-2 px-4">
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                  className="bg-gray-700 text-white px-2 py-1 rounded"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="GESTIONNAIRE">GESTIONNAIRE</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
