//import all dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require ('mqtt');

//connect to broker
var client  = mqtt.connect('mqtt://test.mosquitto.org:1883');
console.log("MQTT client started running");

//create express server app
var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


client.on('connect', function () {
  console.log('connected to broker successfully'); //when connection happens. subscribe to topics here
});

app.get('/', (req, res) => {
  res.send('<h1>HTTP-MQTT bridge</h1><br><p>Send an HTTP GET request to publish MQTT message</p>');
});

//HTTP to MQTT bridge. Publish MQTT message when an HTTP GET request is received
app.get('/mqtt', (req, res) => {  //send GET req to '/mqtt'
    var topic="maceiottest";
    var msg="message from HTTP request";
    client.publish(topic,msg);    //mqtt message published
    console.log('message sent to browser client'); 
    console.log(req.body);
    res.redirect("MQTT Message published successfully");
});

app.listen(8080, () => {
  console.log('Server is up on port 8080');
});
 
