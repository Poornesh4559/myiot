# myIOT
A simple website for user to add their iot devices and control them remotely any where from the world if granted internet connection.


## It uses basic http protocol where the remote device request the server for every fixed time interval and get the updated response.



`STEPS TO IMPLEMENT`<br>

>1. sign up.<br><br>
>2. In your porfile you will have your API key which is later used by your device to access the server.<br><br>
>3. Click the `ADD` Button under the Board.<br><br>
>4. Name your board or device. And give it a suitable description - like : used in kitchen for controlling heat vent.<br><br>
>5. Once you created the device it will appear in your dashboard. Click on the `config` Button.<br><br>
>6. Create the output, make sure you are giving the correct `GPIO` and set the intial state as you desire.<br><br>
>7. Once you click create, a `switch` will appear in the screen through which you will control the output state.<br><br>




### Code for the Microcontorller:

>1. It is implemented for ESP32 devkit from Espressif.<br><br>
>2. I have used Arduino IDE as it is easy to use and common.<br><br>
>3. **But you have to install one additional library called `Arduino_JSON` .**<br><br>
>4. **Replace** the `ssid`, `password` and `API_KEY`, `DEVICE_ID` in the serverName with correct credentials. You can find the API_KEY and DEVICE_ID in your dashboard.<br><br>  

```c
                    #include <WiFi.h>
                    #include <HTTPClient.h>
                    #include <Arduino_JSON.h>
                    
                    const char* ssid = "REPLACE_WITH_YOUR_SSID";
                    const char* password = "REPLACE_WITH_YOUR_PASSWORD";
                    
                    //Your IP address or domain name with URL path
                    const char* serverName = "https://iot-con.herokuapp.com/api/REPLACE_WITH_YOUR_API_KEY/REPLACE_WITH_YOUR_DEVICE_ID";
                    
                    String outputsState;
    
                    void setup() {
                    Serial.begin(115200);
      
                    WiFi.begin(ssid, password);
                    Serial.println("Connecting");
                    while(WiFi.status() != WL_CONNECTED) { 
                      delay(500);
                      Serial.print(".");
                    }
                    Serial.println("");
                    Serial.print("Connected to WiFi network with IP Address: ");
                    Serial.println(WiFi.localIP());
                    }
    
                    void loop() {
                        if(WiFi.status()== WL_CONNECTED ){ 
                          outputsState = httpGETRequest(serverName);
                          Serial.println(outputsState);
                          // put your main code here, to run repeatedly:
                          JSONVar myObject = JSON.parse(outputsState);
                        
                          // JSON.typeof(jsonVar) can be used to get the type of the var
                                         if (JSON.typeof(myObject) == "undefined") {
                            Serial.println("Parsing input failed!");
                            return;
                          }
                        
                          // myObject.keys() can be used to get an array of all the keys in the object
                            JSONVar keys = myObject.keys();
                            JSONVar value = myObject[keys[0]];
                            for (int i = 0; i < value.length(); i++) {
                            Serial.print("GPIO: ");
                            Serial.print(value[i]["gpio"]);
                            Serial.print(" - SET to: ");
                            Serial.println(value[i]["state"]);
                            pinMode(int(value[i]["gpio"]), OUTPUT);
                            digitalWrite(int(value[i]["gpio"]), int(value[i]["state"]));
                            
                            }
                      delay(5000); // this speeds up the simulation
                          
                          
                      }
                      else {
                          Serial.println("WiFi Disconnected");
                          return;
                        }
                    }
    
                    String httpGETRequest(const char* serverName) {
                          HTTPClient client;
                          client.begin(serverName);
                          int httpCode = client.GET();
                          String payload = {};
                          if (httpCode > 0){
                            payload = client.getString();
                            Serial.println("\nStatus code:" + String(httpCode));
                          }
                          else{
                            Serial.println("Error on http request"); 
                          }
                          return payload;
                    }
```
