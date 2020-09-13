#import all required modules
import sys
import time
import paho.mqtt.client as mqtt

#when client connects to broker
def on_connect(mqttc, obj, flags, rc):
    print("Python client connected")

#when message arrives from broker
def on_message(mqttc, obj, msg):
    print(msg.topic+" : "+str(msg.payload))
    
#when client subscribe to a topic
def on_subscribe(mqttc, obj,granted_qos):
    print("Subscribed: " +str(granted_qos))


mqttc = mqtt.Client("p2") #client ID


mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_subscribe = on_subscribe
mqttc.connect("test.mosquitto.org",1883)    #connect to broker URL
mqttc.subscribe("maceiot-browser")          #subscribe to required topics
mqttc.publish("maceiot-python","msg",qos=0) #publish a message
mqttc.loop_forever()                        #keep the client running
time.sleep(10)
