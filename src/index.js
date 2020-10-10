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
  console.log(`++++++++ Server started on port ${process.env.PORT} ++++++++++`);
});

//TODO - refactor
//1. relative paths ../ are difficult to understand.
//   refactor them to absolute paths and remove .js part.
//   import { crudControllers } from '../../utils/crud.js';
//   to
//   import { crudControllers } from '@/utils/crud';

//2. remove all replaceMongoIdWithCustomId() from repo;
//3. add toObjectDTOs mappers
//4. add toObjectEntities mappers
//5. extract services from controllers that require it and separate responsibilites
//6. .lean() .exec() ?
