const transactionModel = require('../models/transaksi.js');
const updateMetodeTransaksi = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid.' });
    }
    const token = authHeader.split(' ')[1];
    const { metodeTransaksi } = req.body;
    if (!metodeTransaksi) {
    return res.status(400).json({ message: 'Metode transaksi harus diisi.' });
    }

    try {
    const result = await transactionModel.updateMetodeTransaksi(token, metodeTransaksi);
    return res.status(200).json(result);
    } catch (error) {
    console.error("Error during transaction method update:", error);
    if (error.message.includes('Error:')) {
        return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Terjadi kesalahan pada server saat memperbarui metode transaksi.' });
    }
};

const lihatHalamanTransaksi = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const result = await transactionModel.lihatHalamanTransaksi(token); 
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error during fetching transaction details:", error);
        if (error.message.includes('Error:')) {
        return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil detail transaksi.' });
    }
};

const lihatRiwayatTransaksi = async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const result = await transactionModel.lihatRiwayatTransaksi(token);
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error("Error during fetching transaction history:", error);
        if (error.message.includes('Error:')) {
        return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: 'Terjadi kesalahan pada server saat mengambil riwayat transaksi.' });
    }
};
module.exports = {
    updateMetodeTransaksi,
    lihatHalamanTransaksi,
    lihatRiwayatTransaksi,
};
