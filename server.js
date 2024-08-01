// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    // host: '107.180.115.157',
    // user: 'nroot',
    // password: 'administrador123',
    // database: 'nquispe_DB'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Endpoint para obtener datos de la base de datos
app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
            return;
        }
        res.json(results);
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});