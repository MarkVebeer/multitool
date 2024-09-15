import express from 'express';
import mysql from 'mysql2/promise';
import axios from 'axios';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url'; // Az __dirname támogatásához
import cron from 'node-cron';
import { spawn } from 'child_process';
import fs from 'fs';
import { fileTypeFromFile } from 'file-type';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Az __dirname helyettesítése ESM modulokban
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'urlshortener'
};

const db = await mysql.createConnection(dbConfig);

await db.query(`
    CREATE TABLE IF NOT EXISTS urls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        originalUrl VARCHAR(2048),
        shortUrl VARCHAR(6),
        lastAccessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`);

// URL rövidítés
app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = nanoid(6);

    try {
        await db.execute('INSERT INTO urls (originalUrl, shortUrl) VALUES (?, ?)', [originalUrl, shortUrl]);
        res.json({ shortUrl: `http://localhost:${PORT}/${shortUrl}` });
    } catch (err) {
        console.error('Error inserting URL:', err);
        res.status(500).send('Server error');
    }
});

// Átirányítás
app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const [rows] = await db.execute('SELECT originalUrl FROM urls WHERE shortUrl = ?', [shortUrl]);

        if (rows.length > 0) {
            await db.execute('UPDATE urls SET lastAccessed = NOW() WHERE shortUrl = ?', [shortUrl]);
            res.redirect(rows[0].originalUrl);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (err) {
        console.error('Error querying URL:', err);
        res.status(500).send('Server error');
    }
});

// inaktív url törlés
cron.schedule('0 * * * *', async () => { // Minden órában fut
    try {
        const now = new Date();
        const expiryTime = new Date();
        expiryTime.setDate(expiryTime.getDate() - 14); // 2 hét (14 nap) visszamenőleg

        const [result] = await db.execute('DELETE FROM urls WHERE lastAccessed < ?', [expiryTime]);

        console.log(`Deleted ${result.affectedRows} URLs at ${now.toISOString()}`);
    } catch (err) {
        console.error('Error removing expired URLs:', err);
    }
});


// Szerver indítása
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
