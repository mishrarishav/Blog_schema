const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
