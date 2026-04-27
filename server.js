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
