import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import upload from 'express-fileupload';
import routes from './src/routes/route';

dotenv.config();

const app = express();

app.use(cors());

app.use(
  upload({
    useTempFiles: true,
  }),
);

app.use(passport.initialize());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use(routes);

app.get('/', (req, res) =>
  res.status(200).json({ status: 200, messsage: 'Welcome to Debt Management System' }),
);

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`server is running on port ${port}`);

export default app;
