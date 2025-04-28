const express = require('express');
const path = require('path');
const app = express();
const PORT = 12345;

app.use(express.static(__dirname));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:12345');
})