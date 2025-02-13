const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRoutes = require('./router/menuRoutes');
require('dotenv').config();

const ConnectDB = require('./db');
const app = express();
app.use(express.json());
app.use(cors());

ConnectDB(process.env.MONGO_URI);

app.use('/menu', menuRoutes);
const PORT = process.env.PORT || 8080
// const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});