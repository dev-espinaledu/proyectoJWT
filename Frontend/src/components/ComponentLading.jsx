import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
    <div
        className="relative flex items-center justify-center"
        style={{
        backgroundImage:
            "url('https://cdna.artstation.com/p/assets/images/images/021/720/920/original/pixel-jeff-mario.gif?1572709433')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw",
        }}
    >
    <div className="absolute top-4 right-4 flex space-x-4">
        <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={handleLogin}
        >
            Iniciar Sesión
        </button>
        <button
            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
            onClick={handleRegister}
        >
            Registrarse
        </button>
    </div>

    <div className="text-center text-white">
        <h1 className="text-5xl font-bold">Bienvenido a Nuestra Plataforma</h1>
        <p className="mt-4 text-lg">La mejor experiencia para tus necesidades digitales</p>
    </div>
    </div>
    );
};

export default LandingPage;