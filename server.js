const express = require('express');
const multer = require('multer'); 
const path = require('path');     
const app = express();
const PORT = 3000;
const aturanPenyimpanan = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function (req, file, cb) {
        const namaUnik = Date.now() + path.extname(file.originalname);
        cb(null, namaUnik);
    }
});
const upload = multer({ storage: aturanPenyimpanan });

app.post('/upload-profil', upload.single('inifoto'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ pesan: "Tolong pilih foto terlebih dahulu!" });
        }
        res.status(200).json({
            pesan: "Foto berhasil diunggah kawan!",
            nama_file_asli: req.file.originalname,
            nama_file_baru: req.file.filename,
            ukuran: req.file.size + " bytes"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ pesan: "Gagal saat mengunggah foto!" });
    }
});
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});


