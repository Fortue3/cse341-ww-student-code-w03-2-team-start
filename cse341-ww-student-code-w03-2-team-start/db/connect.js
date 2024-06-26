const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log('Connected successfully');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
  });

module.exports = mongoose;
