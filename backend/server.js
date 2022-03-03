const path = require(path);
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const PORT = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const { path } = require('express/lib/application');
const app = express();

//connect to DB
connectDB();

//to send data in json format
app.use(express.json());

//to get data from urlencoded form
app.use(express.urlencoded({ extended: false }));

//heroku setup
// serve frontend
if (process.env.NODE_ENV === 'production') {
  //set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  );
} else {
  //creating a route
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
  });
}

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

//custom error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
