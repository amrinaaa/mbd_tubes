const db = require('../configdb/database.js');

// Middleware untuk memverifikasi token pengguna
const authenticate = async (req, res, next) => {
  const tokenHeader = req.headers['authorization'];
  
  // Memeriksa apakah token ada di header
  if (!tokenHeader) {
    return res.status(401).json({ message: 'Token tidak ditemukan. Anda harus login terlebih dahulu.' });
  }

  // Menghilangkan prefix "Bearer " dari token
  const token = tokenHeader.startsWith('Bearer ') ? tokenHeader.slice(7) : tokenHeader;

  try {
    // Memanggil prosedur untuk verifikasi token
    const queryCall = `CALL getUserByToken(?, @p_email, @p_nama, @p_role)`;
    const getResultQuery = `SELECT @p_email AS email, @p_nama AS nama, @p_role AS role`;

    // Menjalankan prosedur untuk mengatur nilai output
    await db.query(queryCall, [token]);

    // Mengambil nilai output dari variabel
    const [rows] = await db.query(getResultQuery);
    const result = rows[0];

    // Validasi hasil: jika token tidak valid atau tidak ditemukan
    if (!result.email) {
      return res.status(401).json({ message: 'Token tidak valid atau pengguna tidak ditemukan.' });
    }

    // Menyimpan data pengguna dalam req.user untuk digunakan di rute berikutnya
    req.user = {
      email: result.email,
      nama: result.nama,
      role: result.role
    };

    // Melanjutkan ke middleware atau rute berikutnya
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = authenticate;
