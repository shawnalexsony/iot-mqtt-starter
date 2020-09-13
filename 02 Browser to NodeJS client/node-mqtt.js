const mqtt = require ('mqtt');                                  //import the module
var client  = mqtt.connect('mqtt://test.mosquitto.org:1883');   //connect to broker
console.log("Client started running");


client.on('connect', function () {                              //when client connects to broker
  console.log('connected to broker successfully');
  
  client.subscribe("maceiottest-browser");                      //subscribe to topic
  console.log('subscribed to topic maceiottest-browser');
  
});

client.on('message', function (topic, message){                 //when message arrives
  console.log(message.toString());                              // display the message
  var today = new Date();                                       // get time 
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var msg = "Message from NodeJS at time :"+time;
  setTimeout(function(){                                        //publish new message after 3 seconds of arrival
      client.publish('maceiottest-node',msg);
      console.log('message sent to browser client');
},3000); 
});
