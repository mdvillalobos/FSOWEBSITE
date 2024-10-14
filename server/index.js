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

app.use(helmet());
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true, //apply HSTS to subdomain
    preload: true //Allow domain to be included in HSTS preload list
}));

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self"],
        scriptSrc: ["'self'", "https://nu-fso-54ab116ceb1f.herokuapp.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'"],
        connectSrc: ["'self'", "https://nu-fso-54ab116ceb1f.herokuapp.com"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"], //prevent this page from being loaded in a 
        upgradeInsecureRequests: [], //automaticall upgrade HTTP to HTTPS

    }
}));

app.use(helmet.frameguard({
    action: 'Deny'
}));

app.use(helmet.noSniff());

app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

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