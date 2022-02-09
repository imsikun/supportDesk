const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const PORT = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const app = express();

//connect to DB
connectDB();

//creating a route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

//to send data in json format
app.use(express.json());

//to get data from urlencoded form
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));

//custom error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
