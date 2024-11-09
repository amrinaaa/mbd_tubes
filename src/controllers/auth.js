const authModel = require('../models/auth.js');

const regisUser = async (req, res) => {
  const { email, password, nama, alamat, no_hp, role } = req.body;
  if (!email || !password || !nama || !alamat || !no_hp || !role) {
    return res.status(400).json({ message: 'Semua data harus diisi.' });
  }

  try {
    await authModel.registrasi(email, password, nama, alamat, no_hp, role);
    res.status(201).json({ message: 'Registrasi berhasil. Selamat datang!' });
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.message === 'Email sudah terdaftar.' || error.message === 'Role tidak valid.') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password harus diisi.' });
  }

  try {
    const result = await authModel.login(email, password);
    return res.status(200).json({
      message: 'Login berhasil',
      token: result.token,
      role: result.role
    });
  } catch (error) {
    console.error("Error during login in controller:", error);
    if (error.message === 'Login gagal: Email atau password salah.') {
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

const logoutUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email harus diisi.' });
  }

  try {
    const result = await authModel.logout(email);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error during logout:", error);
    if (error.message === 'Logout gagal: Email tidak ditemukan.') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = {
  regisUser,
  loginUser,
  logoutUser
};
