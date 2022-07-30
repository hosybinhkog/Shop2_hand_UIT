const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cloundinary = require('cloudinary');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileUpload');

const Router = require('./routes');
const connectMongo = require('./services/db');

const errorHandlerMiddleware = require('./middleware/error');

dotenv.config();

const PORT = process.env.PORT || 5555;

const app = express();
cloundinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.set('trust proxy', 1);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
    exposedHeaders: ['Set-Cookie', 'Date', 'ETag'],
  })
);

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

app.use(Router);
app.use(errorHandlerMiddleware);
connectMongo();

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
