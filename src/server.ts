import express from 'express';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import fs from 'fs-extra';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import minifyHTML from 'express-minify-html-terser';
import dotenv from 'dotenv';

declare module 'express-session' {
  interface SessionData {
    userId: string
    email: string,
    fullname: string,
    role: number,
    department: string | null | undefined
  }
}

// Checking if .env file is available
if (fs.existsSync('.env')) {
  dotenv.config();
} else {
  console.error('.env file not found.');
}

import routes from './routes'
import { connectDB } from './config/mongodb';
import { sessionStore } from './config/sessionStore';
import showData from './middleware/helpers';

const app = express();
const port = process.env.PORT || 8080;

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Session
app.use(
  session({
    secret: process.env.SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: false, // only use cookie over https (only for deployment)
      maxAge: 60000 * 60, // session expire in a hour
      httpOnly: false, // dont let browser javascript access cookie
      sameSite: 'lax' // prevent CSRF Attack
    },
    store: sessionStore
  })
);

// Helper
app.use(showData)

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
  express.static(path.join(__dirname, '../assets/lib/additional-methods.min.js')),
  express.static(path.join(__dirname, '../assets/lib/jquery.validate.min.js')),
  express.static(path.join(__dirname, '../node_modules/@fortawesome/fontawesome-free'))
]);
app.use(express.static(path.join(__dirname, '../assets')));
//app.use(favicon(path.join(__dirname, '../public', 'img/favicon.png')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Minify HTML output
app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  })
);

// Route Init
routes(app);

// Connect db
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
