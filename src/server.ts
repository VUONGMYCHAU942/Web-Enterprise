import express from 'express';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import fs from 'fs-extra';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes'
import { connectDB } from './config/mongodb';

// Checking if .env file is available
if (fs.existsSync('.env')) {
  dotenv.config();
} else {
  console.error('.env file not found.');
}

const app = express();
const port = process.env.PORT || 8080;

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Use proxy for express server
app.set('trust proxy', true);

// Gzip
app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      } else {
        return compression.filter(req, res);
      }
    }
  })
);

// Public
app.use('/lib', [
  express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css')),
  express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')),
  express.static(path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')),
  express.static(path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free'))
]);
app.use(express.static(path.join(__dirname, '../public')));
//app.use(favicon(path.join(__dirname, '../public', 'img/favicon.png')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Route Init
routes(app);

//Set  the viiew engine to ejs
app.set('view engine', 'ejs');

// Connect db
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
