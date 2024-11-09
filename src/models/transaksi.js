const db = require('../configdb/database.js');
const updateMetodeTransaksi = async (token, metodeTransaksi) => {
    const query = `CALL updateMetodeTransaksi(?, ?)`;
    try {
        const [results] = await db.query(query, [token, metodeTransaksi]);
        const messageResult = results[0][0];
        if (messageResult.message.includes('Error:')) {
        throw new Error(messageResult.message);
    }
    return {
    message: messageResult.message
    };
} catch (error) {
    console.error("Error during transaction method update:", error);
    throw error;
    }
};

const lihatHalamanTransaksi = async (token) => {
    const query = `CALL lihatHalamanTransaksi(?)`;
    try {
        const [results] = await db.query(query, [token]);
        const messageResult = results[0][0];
        if (messageResult.message && messageResult.message.includes('Error:')) {
            throw new Error(messageResult.message);
        }
        return {
            metodeTransaksi: messageResult.metode_transaksi,
            totalHarga: messageResult.total_harga,
            statusTransaksi: messageResult.status_transaksi
        };
    } catch (error) {
        console.error("Error during fetching transaction details:", error);
        throw error;
        }
    };

    const lihatRiwayatTransaksi = async (token) => {
        const query = `CALL lihatRiwayatTransaksi(?)`;
        try {
            const [results] = await db.query(query, [token]);
            const messageResult = results[0][0];
            if (messageResult && messageResult.message && messageResult.message.includes('Error:')) {
            throw new Error(messageResult.message);
            }
            return results[0];
        } catch (error) {
            console.error("Error during fetching transaction history:", error);
            throw error;
        }
    };

module.exports = {
    updateMetodeTransaksi,
    lihatHalamanTransaksi,
    lihatRiwayatTransaksi,
};
