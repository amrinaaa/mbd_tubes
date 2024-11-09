const express = require('express');
const router = express.Router();
const orderServicesController = require('../controllers/orderServices.js');

router.get('/daftar-layanan', orderServicesController.mencariLayananByKategori);
router.post('/orders', orderServicesController.newOrderPelanggan);
router.put('/orders/edit', orderServicesController.editDataOrders);
router.delete('/orders/delete', orderServicesController.hapusOrders);

router.post('/orders/add-service-to-orders', orderServicesController.tambahLayananKeOrder);
router.get('/orders/order-save', orderServicesController.lihatOrderanTersimpan);
router.patch('/orders/edit-service-in-orders', orderServicesController.gantiLayananDiOrder);
router.delete('/orders/delete-service-in-orders', orderServicesController.hapusLayananDariOrder);

module.exports = router;
