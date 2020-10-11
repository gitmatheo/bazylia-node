import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/index.js';

dotenv.config();
const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', error => console.error(error));

const corsConfigOptions = {
  methods: 'GET, POST, PUT, DELETE',
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(cors(corsConfigOptions));
app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Expose-Headers', 'Location, Content-Disposition');
  next();
});

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`++++++++ Server started on http://localhost:${process.env.PORT} ++++++++++`);
});
