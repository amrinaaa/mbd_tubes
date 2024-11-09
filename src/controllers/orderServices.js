const orderModel = require('../models/orderServices.js');

const mencariLayananByKategori = async (req, res) => {
  const { namaKategori } = req.body;
  if (!namaKategori) {
    return res.status(400).json({ message: 'Nama kategori harus diisi.' });
  }

  try {
    const result = await orderModel.mencariLayananByKategori(namaKategori);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error during fetching services by category:", error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data layanan.' });
  }
};

const newOrderPelanggan = async (req, res) => {
    const tokenHeader = req.headers['authorization'];
    const { lokasi, jadwalService, durasiKerja } = req.body;
    if (!tokenHeader || !lokasi || !jadwalService || !durasiKerja) {
        return res.status(400).json({ message: 'Token, lokasi, jadwalService, dan durasiKerja harus diisi.' });
    }
    const token = tokenHeader.startsWith('Bearer ') ? tokenHeader.slice(7) : tokenHeader;
    try {
        const result = await orderModel.newOrderPelanggan(token, lokasi, jadwalService, durasiKerja);
        return res.status(201).json(result);
    } catch (error) {
        console.error("Error during order creation:", error);
    if (error.message === 'Pelanggan tidak ditemukan atau token tidak valid.') {
        return res.status(401).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan order.' });
        }
    };

const editDataOrders = async (req, res) => {
    const tokenHeader = req.headers['authorization'];
    const { lokasi, jadwalService, durasiKerja } = req.body;
    if (!tokenHeader || !lokasi || !jadwalService || !durasiKerja) {
        return res.status(400).json({ message: 'Token, lokasi, jadwalService, dan durasiKerja harus diisi.' });
    }
    const token = tokenHeader.startsWith('Bearer ') ? tokenHeader.slice(7) : tokenHeader;
    try {
        const result = await orderModel.editDataOrders(token, lokasi, jadwalService, durasiKerja);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error during order update:", error);
        if (error.message === 'Pelanggan tidak ditemukan atau token tidak valid.' || error.message === 'Order tidak ditemukan untuk pelanggan ini.') {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengedit order.' });
        }
    };

const tambahLayananKeOrder = async (req, res) => {
    const tokenHeader = req.headers['authorization'];
    const { namaLayanan } = req.body;
    if (!tokenHeader || !namaLayanan) {
        return res.status(400).json({ message: 'Token dan nama layanan harus diisi.' });
    }
    const token = tokenHeader.startsWith('Bearer ') ? tokenHeader.slice(7) : tokenHeader;
    try {
        const result = await orderModel.tambahLayananKeOrder(token, namaLayanan);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error during adding service to order:", error);
        if (error.message.startsWith('Error:')) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan layanan ke order.' });
    }
};

const gantiLayananDiOrder = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid.' });
    }
        const token = authHeader.split(' ')[1];
        const { namaLayananLama, namaLayananBaru } = req.body;
        if (!namaLayananLama || !namaLayananBaru) {
            return res.status(400).json({ message: 'Nama layanan lama dan nama layanan baru harus diisi.' });
        }
        try {
        const result = await orderModel.gantiLayananDiOrder(token, namaLayananLama, namaLayananBaru);
        return res.status(200).json(result);
        } catch (error) {
            console.error("Error during replacing service in order:", error);
            if (error.message.includes('Error:')) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengganti layanan dalam order.' });
    }
};

const hapusLayananDariOrder = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid.' });
    }
    const token = authHeader.split(' ')[1];
    const { namaLayanan } = req.body;
    if (!namaLayanan) {
        return res.status(400).json({ message: 'Nama layanan harus diisi.' });
    }
    try {
    const result = await orderModel.hapusLayananDariOrder(token, namaLayanan);
    return res.status(200).json(result);
    } catch (error) {
    console.error("Error during deleting service from order:", error);
    if (error.message.includes('Error:')) {
        return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat menghapus layanan dari order.' });
    }
}

const lihatOrderanTersimpan = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const result = await orderModel.lihatOrderanTersimpan(token);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error during fetching stored orders:", error);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server saat melihat order tersimpan' });
    }
};

const hapusOrders = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid.' });
    }
    const token = authHeader.split(' ')[1];

    try {
    const result = await orderModel.hapusOrders(token);
    return res.status(200).json(result);
    } catch (error) {
    console.error("Error during order deletion:", error);

      // Menangani error dengan pesan khusus
    if (error.message.includes('Error:')) {
        return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat menghapus order.' });
    }
};

module.exports = {
    gantiLayananDiOrder,
    mencariLayananByKategori,
    newOrderPelanggan,
    editDataOrders,
    tambahLayananKeOrder,
    hapusLayananDariOrder,
    lihatOrderanTersimpan,
    hapusOrders,
};
