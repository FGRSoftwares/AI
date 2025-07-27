import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Painel() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario');

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Bem-vindo, {usuario}!
        </h1>
        <p className="text-gray-600 mb-6">
          Você acessou o painel do sistema com sucesso.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
