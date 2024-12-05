const express = require('express');
const { createCanvas } = require('canvas');
const JsBarcode = require('jsbarcode');

const app = express();
const port = 3000;

app.get('/barcode.jpg', (req, res) => {
    // Tekst dla kodu kreskowego
  //const text = "123456fdsfsdfsd";
    const text = "12dsardsfsdfsd";

    // Rozmiary canvas w pikselach dla 300 DPI
    // Dla przykładu, zakładamy, że kod ma 2 cale szerokości i 0.66 cala wysokości
    const widthInInches = parseFloat(req.query.width) || 6; // Domyślna szerokość to 2 cale, jeśli nie określono
    const heightInInches = parseFloat(req.query.height) || 6.66; // Domyślna wysokość to 0.66 cala, jeśli nie określono
    const dpi = 300; // Rozdzielczość 300 DPI
    const canvasWidth = widthInInches * dpi;
    const canvasHeight = heightInInches * dpi;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    JsBarcode(canvas, text, {
        format: "CODE128",
    flat: true,
    width: 5, // Szerokość pojedynczego paska w kodzie kreskowym
    height: 400, // Wysokość kodu kreskowego
    margin: 10 // Margines wokół kodu kreskowego
    });

    const stream = canvas.createJPEGStream({
        quality: 0.95
    });

    res.setHeader('Content-Type', 'image/jpg');
    stream.pipe(res);
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});