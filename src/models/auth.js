const db = require('../configdb/database.js');

const registrasi = async (email, password, nama, alamat, no_hp, role) => {
  const query = `CALL registrasi(?, ?, ?, ?, ?, ?)`;
  try {
    const [result] = await db.query(query, [email, password, nama, alamat, no_hp, role]);
    return result;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

const login = async (email, password) => {
  const query = `CALL login(?, ?, @p_token, @p_role)`;
  const getResultQuery = `SELECT @p_token AS token, @p_role AS role`;

  try {
    // Memanggil prosedur login dengan email dan password
    await db.query(query, [email, password]);

    // Mendapatkan hasil dari output parameter token dan role
    const [rows] = await db.query(getResultQuery);
    const result = rows[0];

    // Jika token tidak ditemukan, lemparkan error khusus untuk password salah
    if (!result.token) {
      throw new Error('Login gagal: Email atau password salah.');
    }

    // Mengembalikan token dan role jika login berhasil
    return {
      token: result.token,
      role: result.role
    };
  } catch (error) {
    console.error("Error during login in model:", error);

    // Menangani pesan error dari MySQL SIGNAL khusus untuk password
    if (error.sqlMessage === 'Password salah.') {
      throw new Error('Login gagal: Email atau password salah.');
    }

    throw error; // Lempar error lain ke controller
  }
};

const logout = async (email) => {
  const query = `CALL logout(?)`;

  try {
    // Memanggil prosedur logout dengan email
    const [result] = await db.query(query, [email]);

    // Memeriksa pesan dari hasil query
    if (result && result[0] && result[0][0].message === 'Logout berhasil.') {
      return { message: 'Logout berhasil' };
    } else {
      throw new Error('Logout gagal: Email tidak ditemukan.');
    }
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

module.exports = {
  registrasi,
  login,
  logout
};
