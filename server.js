const path = require('path');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 500;
const connectDB = require('./config/db')
const app = express();

connectDB();

//static folder
app.use(express.static(path.join(__dirname, 'public')))

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
  res.json({ message: 'Welcome to the RandomIdeas API' });
} )

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`ser listing on port ${port}`));