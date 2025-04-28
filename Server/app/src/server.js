require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.json({message: 'Bienvenido al servidor Photo-Social-Backend'});
})

app.use("/uploads", express.static("uploads")); 
//app.use("/coverage/Icov-report/src/index.html",express.static())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error de conexión:", err));

const photoRoutes = require("./routes/photoRoutes");
app.use("/api/photos", photoRoutes);

module.exports = app; 

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}
