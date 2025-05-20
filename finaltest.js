const mqtt = require('mqtt');  
const sql = require('mssql');  
const axios = require('axios');  // Dodaj axios do wysyłania żądań HTTP    
let ordernumerout; // Zmienna globalna do przechowywania numeru zamówienia  
  
// Konfiguracja MQTT  
const client = mqtt.connect('mqtt://localhost');  
  
// Konfiguracja połączenia z bazą danych  
const config = {  
    user: 'reporting.bydgoszcz',  
    password: '',  
    server: '156.4.10.242',  
    database: 'REPORTING-BYD',  
    options: {  
        encrypt: false,  
        trustServerCertificate: true  
    }  
};  
  
// Funkcja wykonująca zapytanie do bazy danych  
async function executeQuery(orderNumber) {  
    try {  
        await sql.connect(config);  
//        const result = await sql.query`SELECT * FROM [REPORTING-BYD].[dbo].[COOIS3WEEKSALP] WHERE OrderNumber = ${orderNumber}`;  
        const result = await sql.query`SELECT * FROM [REPORTING-BYD].[dbo].[COOIS3WEEKSALP] WHERE OrderNumber = CAST(${orderNumber} AS VARCHAR)`;

        const [firstRecord] = result.recordset;  
        console.log(`EAN_Consumer_Unit_GTIN: ${firstRecord.EAN_Consumer_Unit_GTIN}`);  
        console.log(`ITF_Outer_Trading_Unit_GTIN: ${firstRecord.ITF_Outer_Trading_Unit_GTIN}`);  
        // await axios.post('http://localhost:3002/generate-barcodes', {  
        //     EAN_Consumer_Unit_GTIN: '8712561484398',  
        //     ITF_Outer_Trading_Unit_GTIN: firstRecord.ITF_Outer_Trading_Unit_GTIN  
        // });  
    } catch (err) {  
        console.error('Błąd podczas wykonywania zapytania:', err);  
    } finally {  
        await sql.close();  
    }  
}  
  
// Obsługa wiadomości MQTT  
client.on('message', (topic, message) => {  
    if (topic === 'test/topic') {  
        try {  
            const payload = JSON.parse(message.toString());  
            const [{ v: orderNumber }] = payload.values;  
  
            if (isNaN(orderNumber)) {  
                console.error('Brak wymaganych danych lub nieprawidłowy typ OrderNumber w wiadomości MQTT');  
                return;  
            }  
  
            ordernumerout = orderNumber;  
            executeQuery(ordernumerout); // Poprawne przekazanie zmiennej  
  
        } catch (err) {  
            console.error('Błąd podczas przetwarzania wiadomości:', err);  
        }  
    }  
});  
  
// Subskrypcja tematu MQTT  
client.subscribe('test/topic', (err) => {  
    if (err) {  
        console.error('Błąd podczas subskrypcji:', err);  
    } else {  
        console.log('Subscribed to topic: test/topic');  
    }  
});  
  
// Obsługa połączenia MQTT  
client.on('connect', () => {  
    console.log('MQTT client connected');  
});  
  
client.on('error', (err) => {  
    console.error('Błąd połączenia MQTT:', err);  
});  
  
// Funkcja używająca numeru zamówienia po pewnym czasie  
function useOrderNumber() {  
    if (ordernumerout) {  
        console.log(`Using OrderNumber: ${ordernumerout}`);  
        executeQuery(ordernumerout); // Poprawne przekazanie zmiennej  
    } else {  
        console.log('OrderNumber is not set yet.');  
    }  
}  
  
// Wywołanie funkcji useOrderNumber po 5 sekundach  
setTimeout(useOrderNumber, 5000);  
  
// Przykładowe wywołanie funkcji z numerem zamówienia na początku  
executeQuery('15465145');  
