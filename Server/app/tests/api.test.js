const request = require("supertest");
const mongoose = require("mongoose");
const path = require("path");
const app = require('../src/server'); 


let uploadedPhotoId = '';
const userId = "12345";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Tests - Gestión de Fotos', () => {

  test("POST /api/photos/upload - Debería subir una foto correctamente", async () => {
    const res = await request(app)
        .post("/api/photos/upload")
        .field("userId", userId) 
        .attach("photo", path.join(__dirname, "test.jpg")); 

    console.log("Respuesta POST /api/photos/upload:", res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("photo"); 
    expect(res.body.photo).toHaveProperty("imageUrl");
    expect(res.body.photo).toHaveProperty("_id");

    uploadedPhotoId = res.body.photo._id; 
}, 10000);

test("GET /api/photos/:userId - Debería obtener todas las fotos del usuario", async () => {
    const res = await request(app).get(`/api/photos/${userId}`);

    console.log("Respuesta GET /api/photos/:userId:", res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0); 
});

test("DELETE /api/photos/:id - Debería eliminar la foto correctamente", async () => {
    expect(uploadedPhotoId).toBeDefined(); 
    console.log(`Intentando eliminar la foto con ID: ${uploadedPhotoId}`);
    
    const res = await request(app).delete(`/api/photos/${uploadedPhotoId}`);

    console.log("Respuesta DELETE /api/photos/:id:", res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Foto eliminada con éxito");

    const verifyRes = await request(app).get(`/api/photos/${userId}`);
    expect(verifyRes.body.find(photo => photo._id === uploadedPhotoId)).toBeUndefined();
  });
});
