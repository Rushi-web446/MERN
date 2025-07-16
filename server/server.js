import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// const connectDB = require('./config/db');

import connectDB  from './config/db.js';
import routes from './routes/auth.js'

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

connectDB();



app.get('/', (req, res) => {
  // res.send(' "/" page  ');

  res.redirect('/login');
});

app.use('/auth', routes);



app.get('/login', (req, res) => {
  res.send("<h1>Login Page</h1>");
});

app.post('/login', (req, res) => {

});

app.get('/signup', (req, res) => {
  res.send("<h1>Signup Page</h1>");
});

app.post('signup', (req, res) => {

});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

