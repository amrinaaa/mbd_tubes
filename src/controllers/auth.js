const authModel = require('../models/auth.js');

const regisUser = async (req, res) => {
  const { email, password, nama, alamat, no_hp, role } = req.body;

  // Validasi input untuk registrasi
  if (!email || !password || !nama || !alamat || !no_hp || !role) {
    return res.status(400).json({ message: 'Semua data harus diisi.' });
  }

  try {
    // Memanggil fungsi registrasi dari model
    await authModel.registrasi(email, password, nama, alamat, no_hp, role);
    res.status(201).json({ message: 'Registrasi berhasil. Selamat datang!' });
  } catch (error) {
    console.error("Error during registration:", error);

    // Menangani kesalahan registrasi khusus
    if (error.message === 'Email sudah terdaftar.' || error.message === 'Role tidak valid.') {
      return res.status(400).json({ message: error.message });
    }

    // Respons untuk kesalahan server
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input untuk login
  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password harus diisi.' });
  }

  try {
    // Memanggil fungsi login dari model
    const result = await authModel.login(email, password);

    // Mengirimkan respons jika login berhasil
    return res.status(200).json({
      message: 'Login berhasil',
      token: result.token,
      role: result.role
    });
  } catch (error) {
    console.error("Error during login in controller:", error);

    // Respons spesifik jika login gagal
    if (error.message === 'Login gagal: Email atau password salah.') {
      return res.status(401).json({ message: error.message });
    }

    // Respons untuk kesalahan server
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

const logoutUser = async (req, res) => {
  const { email } = req.body;

  // Validasi input email
  if (!email) {
    return res.status(400).json({ message: 'Email harus diisi.' });
  }

  try {
    // Memanggil fungsi logout dari model
    const result = await authModel.logout(email);

    // Mengirimkan respons sukses jika logout berhasil
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error during logout:", error);

    // Menangani error spesifik jika email tidak ditemukan
    if (error.message === 'Logout gagal: Email tidak ditemukan.') {
      return res.status(404).json({ message: error.message });
    }

    // Mengirimkan respons error untuk kesalahan server lainnya
    return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = {
  regisUser,
  loginUser,
  logoutUser
};
