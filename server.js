import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bookingHandler from './api/booking.js';
import availabilityHandler from './api/availability.js';
import contactHandler from './api/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/booking', async (req, res) => {
    await bookingHandler(req, res);
});

app.get('/api/availability', async (req, res) => {
    await availabilityHandler(req, res);
});

app.post('/api/contact', async (req, res) => {
    await contactHandler(req, res);
});

app.listen(PORT, () => {
    console.log(`✅ API server running on http://localhost:${PORT}`);
});
