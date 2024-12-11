import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SimpleLoginComponent = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      });

      // Guardar el token JWT en localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        // Error de la API
        setError(error.response.data.message || 'Error al iniciar sesión');
      } else {
        // Error de red o error desconocido
        setError('Error en la conexión con el servidor');
      }
    }
  };

  const handleRegisterNavigate = () => {
    navigate('/register');
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
        Iniciar Sesión
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
          Iniciar Sesión
        </button>
      </form>

      <div className="flex justify-between mt-4 text-sm text-gray-600">
        <a href="#" className="hover:underline">
          ¿Olvidó la contraseña?
        </a>
        <button 
          onClick={handleRegisterNavigate}
          className="text-blue-600 hover:underline"
        >
          Registrarse
        </button>
      </div>
    </div>
  </div>
); 
};

export default SimpleLoginComponent;