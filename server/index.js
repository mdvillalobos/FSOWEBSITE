require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

//cors 
app.use(
    cors({
        origin: ['https://nufso.netlify.app', 'http://localhost:5173' ],
        credentials: true
}));

// middleware 
app.use(express.json({ limit : "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/requirements', express.static(path.join(__dirname, 'requirements')));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// router 
app.use('/', require('./src/Routes/ApiRoutes'));

// database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err));

// port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Listening on port: ", port));