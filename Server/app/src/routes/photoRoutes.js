const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { uploadPhoto, getUserPhotos, deletePhoto } = require("../controllers/photoController");

// Definir rutas
router.post("/upload", upload.single("photo"), uploadPhoto);
router.get("/:userId", getUserPhotos);
router.delete("/:id", deletePhoto);

module.exports = router;
