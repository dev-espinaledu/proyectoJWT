import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si hay un token de autenticación
        const token = localStorage.getItem('token');
        
        if (!token) {
            // Si no hay token, redirigir al login
            navigate('/login');
            return;
        }

        // Función para obtener usuarios
        const fetchUsers = async () => {
            try {
                // Realizar solicitud con el token en los headers
                const response = await axios.get('http://localhost:3000/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUsers(response.data);
            } catch (error) {
                console.error('Error al obtener usuarios', error);
                setError('No se pudieron cargar los usuarios');
                
                // Si hay un error de autorización, redirigir al login
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleLogout = () => {
        // Eliminar token y redirigir al login
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            
            // Realizar solicitud de eliminación con el token en los headers
            await axios.delete(`http://localhost:3000/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Actualizar la lista de usuarios eliminando el usuario borrado
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error al eliminar usuario', error);
            setError('No se pudo eliminar el usuario');

            // Si hay un error de autorización, redirigir al login
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    return (
        <div 
            className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
            style={{
                backgroundImage:
                    "url('https://cdna.artstation.com/p/assets/images/images/021/720/920/original/pixel-jeff-mario.gif?1572709433')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed"
            }}
        >
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
                                    Panel de Usuarios
                                </h2>

                                {error && (
                                    <p className="text-red-500 text-center mb-4">{error}</p>
                                )}

                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Username
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.username}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pt-4 flex justify-center">
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;