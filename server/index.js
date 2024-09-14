require('dotenv').config();
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();

// middleware 
app.use(express.json({limit : "10mb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use('/requirements', express.static(path.join(__dirname, 'requirements')))

// router 
app.use('/', require('./src/Routes/ApiRoutes'));

// database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err));


// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port: ", port));