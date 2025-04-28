const API_URL = "http://localhost:5000/api/photos";

document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userId = document.getElementById("userId").value;
    const photo = document.getElementById("photo").files[0];

    if (!userId || !photo) {
        alert("Por favor, ingrese un ID de usuario y seleccione una foto");
        return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("photo", photo);

    try {
        const response = await fetch(`${API_URL}/upload`, {  
            method: "POST",
            body: formData
        });
        const data = await response.json();
        alert(data.message);
        loadPhotos(userId); 
    } catch (error) {
        console.log("Error al subir la imagen: ", error);
    }
});

document.getElementById("photo").addEventListener("change", function() {
    const fileName = this.files[0] ? this.files[0].name : "Ningún archivo seleccionado";
    document.getElementById("file-name").textContent = fileName;
});

const loadPhotos = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`);
        const photos = await response.json();
        const gallery = document.getElementById("gallery");
        gallery.innerHTML = "";

        photos.forEach(photo => {
            const photoCard = document.createElement("div");
            photoCard.classList.add("photo-card");

            const imageUrl = photo.imageUrl.startsWith("http") ? photo.imageUrl : `http://localhost:5000/${photo.imageUrl}`;
            
            photoCard.innerHTML = `
                <img src="${imageUrl}" alt="Foto subida">
                <button onclick="deletePhoto('${photo._id}', '${userId}')">Eliminar</button>
            `;
            
            gallery.appendChild(photoCard);
        });
    } catch (error) {
        console.log("Error al cargar fotos: ", error);
    }
};

const deletePhoto = async (photoId, userId) => {
    try {
        const response = await fetch(`${API_URL}/${photoId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la foto");
        }

        alert("Foto eliminada con éxito.");
        loadPhotos(userId); 

    } catch (error) {
        console.log("Error al eliminar la foto: ", error);
    }
};
