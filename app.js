import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import upload from 'express-fileupload';
import routes from './src/routes/route';

dotenv.config();

const app = express();

app.use(
  upload({
    useTempFiles: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`server is running on port ${port}`);

export default app;
