
#include <Arduino.h>
#include <WiFiClient.h> 
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
 #include <ArduinoJson.h>
#include "certs.h"
#include <WiFiClientSecure.h>
 #include <WiFiClient.h>  
char ssid[] = "Xiaomi_174D";
char pass[] = "NEELRANI62";
String page="";
double data; 
String AtlasAPIKey="DsPeqU8LfoeSxZiEhwtjT3ghDwbzTuPgRYJJJkKDpkwnesq3dxbsl0fWFOOPVjpO";
//WiFiClient client;
const char* host = "192.168.31.1";
const uint16_t port = 443;
WiFiClientSecure sdo_client;
String myString; // complete message from arduino, which consistors of snesors data
char rdata; // received charactors
struct tm timeinfo;
HTTPClient https=HTTPClient() ;
String firstVal,secondVal,thirdVal,fourthVal,fifthVal,sixthVal,seventhVal,eighthVal; // sensors 
String getValue(String , char , int);
BearSSL::CertStore certStore;
//int httppost(firstVal,secondVal,thirdVal,fourthVal);
String getValue(String data, char separator, int index);
uint32_t ipStrToNum(const char* ipStr);
void setClock() {
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");

  Serial.print(F("Waiting for NTP time sync: "));
  time_t nowSecs = time(nullptr);
  while (nowSecs < 8 * 3600 * 2) {
    delay(500);
    Serial.print(F("."));
    yield();
    nowSecs =19800+ time(nullptr);
  }
  Serial.println();
  gmtime_r(&nowSecs, &timeinfo);
  Serial.print(F("Current time: "));
  Serial.print(asctime(&timeinfo));
}
String getValue(String data, char separator, int index){
    int found = 0;
    int strIndex[] = { 0, -1 };
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++) {
        if (data.charAt(i) == separator || i == maxIndex) {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i+1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

uint32_t ipStrToNum(const char* ipStr)
{
  const int SIZE_OF_NUMS = 4;
  union
  {
    uint8_t bytes[SIZE_OF_NUMS];  // IPv4 address
    uint32_t dword;
  } _address;
  _address.dword = 0; // clear return

  int i = 0;
  uint8_t num = 0; // start with 0
  while ((*ipStr) != '\0')
  {
    // while not end of string
    if ((*ipStr == '.') || (*ipStr == ','))
    {
      // store num and move on to next position
      _address.bytes[i++] = num;
      num = 0;
      if (i>=SIZE_OF_NUMS)
      {
        break; // filled array
      }
    }
    else
    {  
      if (*ipStr != ' ')
      {      // skip blanks
        num = (num << 3) + (num << 1); // *10 = *8+*2
        num = num +  (*ipStr - '0');
      }  
    }  
    ipStr++;
  }  
  if (i<SIZE_OF_NUMS)
  {
    // store last num
    _address.bytes[i++] = num;
  }
  return _address.dword; 
 }
 void httppost(String firstVal, String secondVal,String thirdVal,String fourthVal,String fifthVal,String sixthVal,String seventhVal,String eighthVal)
{
//  Serial.print(sdo_client.remoteIP().toString().c_str());
//   Serial.print(':');
//   Serial.println(sdo_client.remotePort());
//   Serial.println ("ok");
  sdo_client.setInsecure();
   int httpResponseCode;
     //Serial.print(sdo_client.remoteIP().toString().c_str());

//String url = "https://finalyearproject-5iva.onrender.com/send"; ///send?mq2="+(String)firstVal+(String)"&mq7="+(String)secondVal+(String)"&mq135="+(String)thirdVal+(String)"&dust2="+(String)fourthVal+(String)"&admin=Arpan";//IP NodeJS
 //String Payload=(firstVal)+","+(secondVal)+","+(thirdVal)+","+(fourthVal);
 // int httpResponseCode=http.POST(Payload);
      if (https.begin(sdo_client, "https://ap-south-1.aws.data.mongodb-api.com/app/data-nmukl/endpoint/send")) {  // HTTPS
        /* Headers Required for Data API*/
        https.addHeader("Content-Type", "application/json");
        //https.addHeader("User_Id","65e51867f1128ebaaf4231f0"); //const String &value)
       // https.addHeader("API_KEY", AtlasAPIKey);
         JsonDocument payload;
          //payload["UserId"]="65e51867f1128ebaaf4231f0";
        
       // payload["Time"]=(String)asctime(&timeinfo);
        payload["CO"]=firstVal;
        payload["O3"]=secondVal;
        payload["NO2"]=thirdVal;;
        payload["SO2"]=fourthVal;
        payload["PM25"]=fifthVal;
        payload["PM10"]=sixthVal;
        payload["latitude"]=seventhVal;
        payload["longitude"]=eighthVal;
      String JSONText;
        serializeJson(payload, JSONText);
        Serial.println(JSONText);
        int httpCode = https.POST(JSONText);
        //Serial.println(httpCode);
       // Serial.println(httpCode);
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
             String payload = https.getString();
              Serial.println(payload);

// if(http.begin(wff,url)){
//    http.addHeader("Content-Type", "text/plain");
//  httpResponseCode=http.POST(Payload);
//    Serial.println(url+Payload);
// }
// else{
//   Serial.println("server connection failed");
// }
  
//   delay(300);
        
  if (httpCode > 0) {
    //  Serial.print("HTTP Response code: ");
    // Serial.println(httpCode);

  }
   //Serial.println();
  //Serial.println("closing connection");
  sdo_client.stop();
//delay(3000);
        }

 // return httpCode;
}
}





void setup() {

  Serial.begin(9600);
  // Serial.setDebugOutput(true);
   Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
   WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
    IPAddress host_ip(ipStrToNum(host));
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
Serial.println(host_ip);
  
   if (!sdo_client.connect(host_ip, 443)) {
  //if (!sdo_client.connect("sdo.gsfc.nasa.gov", 443)) {
      Serial.println("connection failed");
  }
  Serial.print(sdo_client.remoteIP().toString().c_str());
  Serial.print(':');
  Serial.println(sdo_client.remotePort());
  Serial.println ("ok");

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  setClock();
}
void loop() {
   
   
  if (Serial.available() > 0 ) 
  {
    rdata = Serial.read(); 
    myString = myString+ rdata; 
 
    if( rdata == '\n')
    {    
      
  //  Serial.println(myString);
String l = getValue(myString, ',', 0);
String m = getValue(myString, ',', 1);
String n = getValue(myString, ',', 2); 
String o = getValue(myString, ',', 3);
String p = getValue(myString, ',', 4);
String q = getValue(myString, ',', 5);
String r = getValue(myString, ',', 6);
String s = getValue(myString, ',', 7);

l.trim();
m.trim();
n.trim();
o.trim();
p.trim();
q.trim();
r.trim();
s.trim();
// Serial.println(l);
// Serial.println(m);
// Serial.println(n);
// Serial.println(o);
firstVal =(String)l.c_str() ;//.toFloat();
secondVal =(String)m.c_str() ;//.toFloat();
thirdVal =(String)n.c_str(); //.toFloat();
fourthVal=(String)o.c_str();//.toFloat();
fifthVal=(String)p.c_str();//.toFloat();
sixthVal=(String)q.c_str();//.toFloat();
seventhVal=(String)r.c_str();
eighthVal=(String)s.c_str();
//Serial.println(fifthVal);
  if(firstVal!=""&&secondVal!=""&&thirdVal!=""&&fourthVal!=""&&fifthVal!=""&&sixthVal!=""&&seventhVal!=""&&eighthVal!="")
     {httppost(firstVal,secondVal,thirdVal,fourthVal,fifthVal,sixthVal,seventhVal,eighthVal);}
 // static bool wait = false;
 
  // Serial.print("connecting to ");
  // Serial.print(host)
  // Serial.print(':');
  // Serial.println(port);

  // Use WiFiClient class to create TCP connections
  // WiFiClientSecure client;
  
  /*if (!client.connect(host, port)) {
    Serial.println("//connection failed");
    delay(5000);
    return;
  }
  else{
    */
  
  // Close the connection

  //BearSSL::X509List cert(certForum);
  
 // client.setTrustAnchors(&cert);
  
 
        
      
  myString = "";
  
    }
  }
  
}
