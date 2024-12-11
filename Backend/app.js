require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(express.json()); // Para parsear JSON

const PORT = process.env.PORT || 3000;
const users = []; // Simula una base de datos

// Habilitar CORS para que el frontend pueda hacer peticiones al backend
app.use(cors());

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Ruta de registro
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Validaciones
    if (!username || username.length < 3) {
        return res.status(400).json({ message: 'Username debe tener al menos 3 caracteres' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password debe tener al menos 6 caracteres' });
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { 
        id: users.length + 1, // Añadir un ID único
        username, 
        password: hashedPassword 
    };
    users.push(newUser);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// Ruta de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar token JWT 
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.json({ token });
});

// Ruta protegida
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso autorizado', user: req.user });
});

// Ruta para obtener usuarios
app.get('/users', authenticateToken, (req, res) => {
    try {
        // Mapear usuarios para no devolver contraseñas
        const usersList = users.map((user) => ({
            id: user.id,
            username: user.username
        }));

        res.json(usersList);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

// Ruta para eliminar un usuario
app.delete('/users/:userId', authenticateToken, (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar el usuario de la lista
        users.splice(userIndex, 1);

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});

// Ruta para actualizar usuario
app.put('/users/:userId', authenticateToken, (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Actualizar el usuario
        users[userIndex].username = req.body.username;
        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}); 

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});