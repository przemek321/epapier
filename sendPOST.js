const axios = require('axios');  
  
const sendPostRequest = async () => {  
    try {  
        const response = await axios.post('http://localhost:3002/generate-barcodes', {  
            EAN_Consumer_Unit_GTIN: '8712561484398',  
            ITF_Outer_Trading_Unit_GTIN: '12345678901234' // Możesz tu podać wartość firstRecord.ITF_Outer_Trading_Unit_GTIN  
        });  
        console.log('Response:', response.data);  
    } catch (error) {  
        console.error('Error sending POST request:', error);  
    }  
};  
  
sendPostRequest();  