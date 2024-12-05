const sql = require('mssql');  
  

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
