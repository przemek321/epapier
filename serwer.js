const express = require('express');  
const path = require('path');  
const app = express();  
  
// Middleware do parsowania JSON z ciała żądania  
app.use(express.json());  
  
// Endpoint POST do odbierania danych  
app.post('/generate-barcodes', (req, res) => {  
    const { EAN_Consumer_Unit_GTIN, ITF_Outer_Trading_Unit_GTIN } = req.body;  
      
    console.log('Received data:');  
    console.log('EAN_Consumer_Unit_GTIN:', EAN_Consumer_Unit_GTIN);  
    console.log('ITF_Outer_Trading_Unit_GTIN:', ITF_Outer_Trading_Unit_GTIN);  
      
    // Wysyłanie odpowiedzi z danymi  
    res.status(200).json({  
        EAN_Consumer_Unit_GTIN: EAN_Consumer_Unit_GTIN,  
        ITF_Outer_Trading_Unit_GTIN: ITF_Outer_Trading_Unit_GTIN  
    });  
});  
  
// Endpoint GET do serwowania strony internetowej  
app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'index.html'));  
});  
  
const PORT = process.env.PORT || 3002;  
app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);  
});  