const express = require('express');
const db = require('../tubes_mbd/src/configdb/database.js');
const authenticate = require('./src/middlewares/autentikasi.js');
const authRoutes = require('./src/routes/auth.js');
const orderServicesRoutes = require('./src/routes/orderSevices.js');
const transaksiRoutes = require('./src/routes/transaksi.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes, authenticate);
app.use('/api', orderServicesRoutes);
app.use('/api', transaksiRoutes);

const port = 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});