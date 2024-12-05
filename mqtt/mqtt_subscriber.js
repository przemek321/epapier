const mqtt = require('mqtt');  
const client = mqtt.connect('mqtt://localhost');  
  
const topic = 'test/topic';  
  
client.on('connect', () => {  
   console.log('Connected to MQTT broker');  
   client.subscribe(topic, (err) => {  
       if (!err) {  
           console.log(`Subscribed to topic ${topic}`);  
       }  
   });  
});  
  
client.on('message', (topic, message) => {  
   console.log(`Received message on topic ${topic}: ${message.toString()}`);  
});  