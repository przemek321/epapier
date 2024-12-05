const mqtt = require('mqtt');  
const sql = require('mssql');  

let ordernumerout ;
// Konfiguracja MQTT  
const client = mqtt.connect('mqtt://localhost');  
const config = {  
    user: 'reporting.bydgoszcz',  
    password: 'Polska01',  
    server: '156.4.10.242',  
    database: 'REPORTING-BYD',  
    options: {  
        encrypt: false,    
        trustServerCertificate: true   
    }  
};    
 
client.on('message', (topic, message) => {  
    if (topic === 'test/topic') {  
        try {  
            const payload = JSON.parse(message.toString());  
   
         const [{ v: orderNumber }] = payload.values;  
  
            if (isNaN(orderNumber)) {  
                console.error('Brak wymaganych danych lub nieprawidłowy typ OrderNumber w wiadomości MQTT');  
                return;  
            }  
            
            ordernumerout = orderNumber ;
             executeQuery(orderNumber);  
            
        } catch (err) {  
            console.error('Błąd podczas przetwarzania wiadomości:', err);  
        }  
    }  
});  

 
client.subscribe('test/topic', (err) => {  
    if (err) {  
        console.error('Błąd podczas subskrypcji:', err);  
    } else {  
        console.log('Subscribed to topic: test/topic');  
    }  
});  
  
 
client.on('connect', () => {  
    console.log('MQTT client connected');  
});  
  
client.on('error', (err) => {  
    console.error('Błąd połączenia MQTT:', err);  
});  


function useOrderNumber() {  
  if (ordernumerout) {  
      console.log(`Using OrderNumber: ${ordernumerout}`);  
      executeQuery('15504259');  
  } else {  
      console.log('OrderNumber is not set yet.');  
  }  
}  

 
setTimeout(useOrderNumber, 5000);  


async function executeQuery(orderNumber) {  
  try {  
     
      await sql.connect(config);  

     
      const result = await sql.query`SELECT * FROM [REPORTING-BYD].[dbo].[COOIS3WEEKSALP] WHERE OrderNumber = ${orderNumber}`;  
      
      const [firstRecord] = result.recordset;  
      console.log(`OrderNumber: ${firstRecord.OrderNumber}`);  
       
  } catch (err) {  
      console.error('Błąd podczas wykonywania zapytania:', err);  
  } finally {  
     
      await sql.close();  
  }  
}  


executeQuery('15465145');  
