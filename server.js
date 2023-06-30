const express = require('express');

const port = 5000;
const app = express();

//body parser middleware

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
  res.json({ message: 'Welcome to the RandomIdeas API' });
} )

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`ser listing on port ${port}`));