import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
      });

      // Mostrar mensaje de éxito
      console.log('Registro exitoso');
      
      // Redirigir al login
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // Error de la API
        setError(error.response.data.message || 'Error al registrar usuario');
      } else {
        // Error de red o error desconocido
        setError('Error en la conexión con el servidor');
      }
    }
  };

  const handleLoginNavigate = () => {
    navigate('/login');
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://cdna.artstation.com/p/assets/images/images/021/720/920/original/pixel-jeff-mario.gif?1572709433')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw"
      }}
    >
      <div className="w-full max-w-md p-10 bg-white bg-opacity-90 shadow-lg rounded-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-700">
          Registrarse
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-200"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <button 
            onClick={handleLoginNavigate}
            className="text-blue-600 hover:underline"
          >
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;