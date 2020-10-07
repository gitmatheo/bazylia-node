
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const protect = require('./utils/auth');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', (error ) => console.error(error));

const corsConfigOptions = {
  methods: 'GET, POST, PUT, DELETE',
  origin: 'http://localhost:8081',
  credentials: true
};

app.use(cors(corsConfigOptions));
app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Expose-Headers', "Location, Content-Disposition");
  next();
});


app.use(require('./routes'));

app.listen(process.env.PORT, () => {
  console.log(`++++++++ Server started on port ${process.env.PORT} ++++++++++`);
});

