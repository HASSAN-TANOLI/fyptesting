const app = require('./app')
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')

//const dotenv = require('dotenv');

//Handle uncaught expection

process.on('uncaughtException' , err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to uncaught Exception');
  process.exit(1)
})


// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

//dotenv.config({path: 'backend/config/config.env'})

//Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
})


const server= app.listen(process.env.PORT, () => {
  console.log(`server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handle unhandeld promise rejection

// err is a callback function
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandeld promise rejection');
  server.close(() => {
    process.exit(1)
  })
})