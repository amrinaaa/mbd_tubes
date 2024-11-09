const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksi.js');

router.patch('/transaksi', transaksiController.updateMetodeTransaksi);
router.get('/transaksi', transaksiController.lihatHalamanTransaksi);
router.get('/transaksi/riwayat', transaksiController.lihatRiwayatTransaksi);

module.exports = router;
