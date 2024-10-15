import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { mongoose } from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';

dotenv.config();
const app = express();


import apiRoutes from './src/Routes/ApiRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//cors 
app.use(
    cors({
        origin: ['https://nu-fso-54ab116ceb1f.herokuapp.com', 'http://localhost:5173' ],
        credentials: true
}));

app.use(helmet({
    hsts: {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true, // Apply HSTS to subdomains
        preload: true,
    },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // Allow resources from the same origin
            scriptSrc: ["'self'","'sha256-abc123...'", "https://cdnjs.cloudflare.com"], // Allow scripts from the same origin and trusted CDN
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // Allow styles from the same origin and inline styles
            imgSrc: ["'self'", "https://res.cloudinary.com/duochblgz/", "data:"], // Allow images from the same origin, data URIs, and a trusted source
            connectSrc: ["'self'"], // Allow connections to your own server and a trusted API
            scriptSrcAttr: ["'self'", "'unsafe-inline'"],
        }
    },
    frameguard: {
        action: 'Deny'
    }

}))

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'no-referrer'); // Change this based on your needs
    next();
});

app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'geolocation=(self), camera=(), microphone=()'); // Adjust as needed
    next();
});

// middleware 
app.use(compression());
app.use(express.json({ limit : "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/requirements', express.static(path.join(__dirname, 'requirements')));

// router 
app.use('/', apiRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


// database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err));

// port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Listening on port: ", port));