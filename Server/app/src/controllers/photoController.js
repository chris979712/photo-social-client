const fs = require("fs");
const path = require("path");
const Photo = require("../models/Photo");


// Subir foto
exports.uploadPhoto = async (req, res) => {
    try {
        const { userId } = req.body;
        const imageUrl = req.file.path;

        const newPhoto = new Photo({ userId, imageUrl });
        await newPhoto.save();

        res.status(201).json({ message: "Foto subida con éxito", photo: newPhoto });
    } catch (error) {
        res.status(500).json({ error: "Error al subir la foto" });
    }
};

// Obtener todas las fotos de un usuario
exports.getUserPhotos = async (req, res) => {
    try {
        const { userId } = req.params;
        const photos = await Photo.find({ userId });

        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las fotos" });
    }
};

// Eliminar una foto
exports.deletePhoto = async (req, res) => {
    try {
      const { id } = req.params;
  
      const photo = await Photo.findById(id);
      if (!photo) {
        return res.status(404).json({ error: "Foto no encontrada" });
      }
      const isTestEnv = process.env.NODE_ENV === "test";
      
      const filePath = (isTestEnv)
                  ? path.join(__dirname, "../../", photo.imageUrl)
                  : path.join(__dirname, "../", photo.imageUrl);
                  
      fs.unlink(filePath, async (err) => {
        if (err) {
          console.error("Error al eliminar el archivo:", err);
          return res.status(500).json({ error: "Error al eliminar la imagen del servidor" });
        }
  
        await Photo.findByIdAndDelete(id);
  
        res.status(200).json({ message: "Foto eliminada con éxito" });
      });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la foto" });
    }
  };