async function sendPostRequest() {  
    try {  
        const response = await fetch('http://localhost:3002/generate-barcodes', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify({  
                EAN_Consumer_Unit_GTIN: '8712561484398',  
                ITF_Outer_Trading_Unit_GTIN: '08712561484367'  
            })  
        });  
        const data = await response.json();  
        console.log('Response:', data);  
  
        // Wyświetlenie danych na stronie  
        const dataDiv = document.getElementById('data');  
        dataDiv.innerHTML = `  
            <p>EAN_Consumer_Unit_GTIN: ${data.EAN_Consumer_Unit_GTIN}</p>  
            <p>ITF_Outer_Trading_Unit_GTIN: ${data.ITF_Outer_Trading_Unit_GTIN}</p>  
        `;  
    } catch (error) {  
        console.error('Error sending POST request:', error);  
    }  
}  
  
sendPostRequest();  