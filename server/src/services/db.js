const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const db = () => { 
  mongoose.connect(`${process.env.URL_CONNECT_DB}`)
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`)
    })
    .catch((err) => {
      console.log(`Message error is connected to MongoDB: ${err.message}`)
    })
}

module.exports = db