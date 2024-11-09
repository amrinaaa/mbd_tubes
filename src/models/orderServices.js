const db = require('../configdb/database.js');

const mencariLayananByKategori = async (namaKategori) => {
  const query = `CALL mencariLayanan(?)`;
  try {
    const [results] = await db.query(query, [namaKategori]);
    if (results[0].length === 0) {
      return {
        message: 'Tidak ada layanan yang ditemukan untuk kategori ini.',
        data: []
      };
    }
    return {
      message: 'Layanan berhasil ditemukan.',
      data: results[0]
    };
  } catch (error) {
    console.error("Error during fetching services by category:", error);
    throw error;
  }
};

const newOrderPelanggan = async (token, lokasi, jadwalService, durasiKerja) => {
  const query = `CALL orderLayanan(?, ?, ?, ?)`;
  try {
    const [results] = await db.query(query, [token, lokasi, jadwalService, durasiKerja]);
    const messageResult = results[0][0];
    if (messageResult.message === 'Pelanggan tidak ditemukan atau token tidak valid.') {
      throw new Error(messageResult.message);
    }
    if (messageResult.message === 'Order berhasil ditambahkan.') {
      const orderDetails = results[1];
      return {
        message: messageResult.message,
        order: orderDetails
      };
    }
    throw new Error('Terjadi kesalahan saat menambahkan order.');
  } catch (error) {
    console.error("Error during order creation:", error);
    throw error;
  }
};

const editDataOrders = async (token, lokasi, jadwalService, durasiKerja) => {
  const query = `CALL editDataOrders(?, ?, ?, ?)`;
  try {
    const [results] = await db.query(query, [token, lokasi, jadwalService, durasiKerja]);
    const messageResult = results[0][0];
    if (messageResult.message === 'Pelanggan tidak ditemukan atau token tidak valid.') {
      throw new Error(messageResult.message);
    }
    if (messageResult.message === 'Order tidak ditemukan untuk pelanggan ini.') {
      throw new Error(messageResult.message);
    }
    if (messageResult.message === 'Order berhasil diperbarui.') {
      const updatedOrderDetails = results[1];
      return {
        message: messageResult.message,
        order: updatedOrderDetails
      };
    }
    throw new Error('Terjadi kesalahan saat mengedit order.');
  } catch (error) {
    console.error("Error during order update:", error);
    throw error;
  }
};

const tambahLayananKeOrder = async (token, namaLayanan) => {
  const query = `CALL tambahlayananKeOrders(?, ?)`;
  try {
    const [results] = await db.query(query, [token, namaLayanan]);
    const messageResult = results[0][0];
    if (messageResult.message.startsWith('Error:')) {
      throw new Error(messageResult.message);
    }
    return {
      message: messageResult.message
    };
  } catch (error) {
    console.error("Error during adding service to order:", error);
    throw error;
  }
};

const gantiLayananDiOrder = async (token, namaLayananLama, namaLayananBaru) => {
  const query = `CALL gantiLayananDiOrder(?, ?, ?)`;
  try {
    const [results] = await db.query(query, [token, namaLayananLama, namaLayananBaru]);
    const messageResult = results[0][0];
    if (messageResult.message === 'Error: Pelanggan tidak ditemukan atau token tidak valid.' ||
        messageResult.message === 'Error: Tidak ada order aktif untuk pelanggan ini.' ||
        messageResult.message === 'Error: Layanan lama tidak ditemukan.' ||
        messageResult.message === 'Error: Layanan baru tidak ditemukan.') {
      throw new Error(messageResult.message);
    }
    return {
      message: messageResult.message
    };
  } catch (error) {
    console.error("Error during replacing service in order:", error);
    throw error;
  }
};

const hapusLayananDariOrder = async (token, namaLayanan) => {
  const query = `CALL hapusLayananDariOrder(?, ?)`;
  try {
    const [results] = await db.query(query, [token, namaLayanan]);
    const messageResult = results[0][0];
    if (messageResult.message.includes('Error:')) {
      throw new Error(messageResult.message);
    }
    return {
      message: messageResult.message
    };
  } catch (error) {
    console.error("Error during deleting service from order:", error);
    throw error;
  }
};

const lihatOrderanTersimpan = async (token) => {
  const query = `CALL lihatOrderanTersimpan(?)`;
  try {
    const [results] = await db.query(query, [token]);
    if (results[0].length === 0) {
      return {
        message: 'Tidak ada order yang ditemukan untuk token ini.',
        data: []
      };
    }
    return {
      message: 'Order berhasil ditemukan.',
      data: results[0]
    };
  } catch (error) {
    console.error("Error during fetching stored orders:", error);
    throw error;
  }
};

const hapusOrders = async (token) => {
  const query = `CALL hapusOrders(?)`;
  try {
    const [results] = await db.query(query, [token]);
    const messageResult = results[0][0];
    if (messageResult.message.includes('Error:')) {
      throw new Error(messageResult.message);
    }
    return {
      message: messageResult.message
    };
  } catch (error) {
    console.error("Error during order deletion:", error);
    throw error;
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
