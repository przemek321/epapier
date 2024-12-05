const mqtt = require('mqtt');  
const client = mqtt.connect('mqtt://localhost'); // Połącz się z lokalnym brokerem MQTT  
  
const topic = 'test/topic'; // Temat, na który będziemy publikować dane  
  
// Przykładowe dane do wysłania  
const data = {  
  values: [  
    { id: "Siemens_WIS.SiemensTCP.P4_L00_PO_TAG_L00_PL_4289_C010_PACK_PCLBTL00_POTAG_PO", v: 15504259, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L04_PO_TAG_L04_PL_4289_C010_PACK_PCLBTL04_POTAG_PO", v: 15497696, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L05_PO_TAG_L05_PL_4289_C010_PACK_PCLBTL05_POTAG_PO", v: 15507838, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L06_PO_TAG_L06_PL_4289_C010_PACK_PCLBTL06_POTAG_PO", v: 15504173, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L10_PO_TAG_L10_PL_4289_C010_PACK_CLQJAR10_POTAG_PO", v: 15504401, t: "2024-11-28T07:57:49.022Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L11_PO_TAG_L11_PL_4289_C010_PACK_CLQTUB11_POTAG_PO", v: 15497610, t: "2024-11-28T07:57:49.022Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L12_PO_TAG_L12_PL_4289_C010_PACK_PCLBTL12_POTAG_PO", v: 15504280, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L13_PO_TAG_L13_PL_4289_C010_PACK_PCLBTL13_POTAG_PO", v: 15504093, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L15_PO_TAG_L15_PL_4289_C010_PACK_PCLBTL15_POTAG_PO", v: 15504290, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L16_PO_TAG_L16_PL_4289_C010_PACK_CLQPOU16_POTAG_PO", v: 15507821, t: "2024-11-28T07:57:49.022Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L17_PO_TAG_L17_PL_4289_C010_PACK_PCLBTL17_POTAG_PO", v: 15497722, t: "2024-11-28T07:57:49.022Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L21_PO_TAG_L21_PL_4289_C010_PACK_PCPCTL21_POTAG_PO", v: 15367010, t: "2024-11-28T07:57:49.022Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L23_PO_TAG_L23_PL_4289_C010_PACK_CLQJAR23_POTAG_PO", v: 15497567, t: "2024-11-28T07:57:49.022Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L32_PO_TAG_L32_PL_4289_C010_PACK_CLQTUB32_POTAG_PO", v: 15484487, t: "2024-11-28T07:57:49.022Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L41_PO_TAG_L41_PL_4289_C010_PACK_PCLBTL41_POTAG_PO", v: 15504250, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L53_PO_TAG_L53_PL_4289_C010_PACK_CLQBTL53_POTAG_PO", v: 15496885, t: "2024-11-28T07:57:49.022Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L55_PO_TAG_L55_PL_4289_C010_PACK_CLQBTL55_POTAG_PO", v: 15504428, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L56_PO_TAG_L56_PL_4289_C010_PACK_CLQBTL56_POTAG_PO", v: 15504213, t: "2024-11-28T07:57:49.111Z" },  
    { id: "Siemens_WIS.SiemensTCP.P4_L57_PO_TAG_L57_PL_4289_C010_PACK_CLQBTL57_POTAG_PO", v: 15504276, t:"2024-11-28T07::57::49::111Z"},  
    {id:"Siemens_WIS.SiemensTCP.P4_L61_PO_TAG_L61_PL_4289_C010_PACK_PCPCTL61_POTAG_PO",v :15504517,t:"2024 - 11 - 28 T07 : 57 : 49 . 022 Z"},  
    {id:"Siemens_WIS.SiemensTCP.P4 _ L62 _ PO _ TAG _ L62 _ PL _ 4289 _ C010 _ PACK _ PCPCTL62 _ POTAG _ PO ",v :15497422,t:"2024 - 11 - 28 T07 : 57 : 49 . 022 Z"},  
    {id:"Siemens _ WIS . Siemens TCP . P5 _ L71 _ PO _ TAG _ L71 _ PL _ 4289 _ C010 _ P5PACK _ TBLPOU71 _ POTAG _ PO ",v :13995059,t:"2024 - 11 - 28 T07 : 57 : 49 . 022 Z"},  
    {id:"Siemens _ WIS . Siemens TCP . P5 _ L82 _ PO _ TAG _ L82 _ PL _ 4289 _ C010 _ P5PACK _ TBLBL82 _ POTAG _ PO ",v :14562970,t:"2024 - 11 - 28 T07 : 57 : 49 . 022 Z"},  
    {id:"Siemens _ WIS . Siemens TCP . P5 _ L83 _ PO _ TAG _ L83 _ PL _ 4289 _ C010 _ P5PACK _ TBLBL83 _ POTAG _ PO ",v :15227309,t:"2024 - 11 - 28 T07 : 57 : 49 . 022 Z"}  
]  
};  
  
client.on('connect', () => {  
   console.log('Connected to MQTT broker');  
     
   // Publikowanie danych co określony czas (np. co sekundę)  
   setInterval(() => {  
       client.publish(topic, JSON.stringify(data), (err) => {  
           if (err) {  
               console.error('Failed to publish message', err);  
           } else {  
               console.log('Message published');  
           }  
       });  
   }, 50000); // Interwał publikacji w milisekundach  
});  