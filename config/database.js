const mongoose = require('mongoose');

const initDB = () => {
  mongoose.connect('localhost/tarang', { useNewUrlParser: true });

  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });
};

module.exports = initDB;
