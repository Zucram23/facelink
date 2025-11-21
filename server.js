const express = require('express');
const path = require('path');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Forbind til database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Velkommen til FaceLink API!',
        endpoints: {
            users: '/users',
            posts: '/posts'
        }
    });
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`FaceLink server kører på http://localhost:${PORT}`);
    console.log(`Åbn http://localhost:${PORT} i din browser`);
    console.log(`API dokumentation: http://localhost:${PORT}/api`);
});