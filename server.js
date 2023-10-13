const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

app.use(express.json());

app.post('/download-image', async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl; // Obtén la URL de la imagen desde el cuerpo de la solicitud
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    res.setHeader('Content-Disposition', 'attachment; filename=imagen.jpg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(buffer);
  } catch (error) {
    res.status(500).send('Error al descargar la imagen.');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});