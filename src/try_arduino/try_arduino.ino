#include <SoftwareSerial.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <MQUnifiedsensor.h>
#include <MQ135.h>
#include <MQ7.h>
#include <TinyGPS++.h>

#define placa "Arduino UNO"
#define Voltage_Resolution 5
#define A_PIN 1
#define VOLTAGE 5
#define pin2 A2
#define type1 "MQ-7"
#define type2 "MQ-131"
#define ADC_Bit_Resolution 10 // For arduino UNO/MEGA/NANO
#define RatioMQ131CleanAir 15
#define PIN_MQ135 A3
SoftwareSerial nodemcu(8,9);

MQ7 mq7(A_PIN, VOLTAGE);
MQUnifiedsensor MQ131(placa, Voltage_Resolution, ADC_Bit_Resolution, pin2, type2);
MQUnifiedsensor MQ131_2(placa, Voltage_Resolution, ADC_Bit_Resolution, pin2, type2);
MQ135 mq135_sensor = MQ135(PIN_MQ135);
String gpsloc;
String lati,longi;
 char link[70];
char latitud[11];
char latitudHemisphere[3];
char longitud[11];
char longitudMeridiano[3];
SoftwareSerial pmsSerial(5, 6);
SoftwareSerial gps(4, 2);
TinyGPSPlus ss;
struct pms5003data {
  uint16_t framelen;
  uint16_t pm10_standard, pm25_standard, pm100_standard;
  uint16_t pm10_env, pm25_env, pm100_env;
  uint16_t particles_03um, particles_05um, particles_10um, particles_25um, particles_50um, particles_100um;
  uint16_t unused;
  uint16_t checksum;
};
struct pms5003data data;


void setup() {
Serial.begin(9600);
 nodemcu.begin(9600);
gps.begin(9600);
pmsSerial.begin(9600);

MQ131.setRL(10);
MQ131_2.setRL(10);
MQ131.setRegressionMethod(1); //_PPM =  a*ratio^b
MQ131.setA(23.943); MQ131.setB(-1.11);
MQ131_2.setRegressionMethod(1); //_PPM =  a*ratio^b
MQ131_2.setA(-462.43); MQ131_2.setB(-2.204);
MQ131.init();
MQ131_2.init();
//MQ7 calibration
 mq7.calibrate();
//MQ131 calibration
  MQ131.setR0(1917.22);
  MQ131_2.setR0(1917.22);

}

void loop() {


float CO,SO2,NO2,O3,PM25,PM10;
   String cdata;
  while (gps.available() > 0)
    if (ss.encode(gps.read()))
      displayInfo();
   
  if (millis() > 5000 && ss.charsProcessed() < 10)
  {
    lati=22.5726;longi=88.3639;
  
  }
if (readPMSdata(&pmsSerial)) {
  PM25=data.pm25_standard;
    PM10=data.pm100_standard;
}
  //*******************CARBON MONOXIDE USING MQ7***********
  CO=mq7.readPpm();
    //**************OZONE AND NO2 USING MQ131********************
  MQ131.update();
  MQ131_2.update();
  O3 = MQ131.readSensorR0Rs();
  NO2 = MQ131_2.readSensorR0Rs();
  //******************SO2 USING MQ135****************
 SO2 = mq135_sensor.getSo2();

 cdata =cdata+CO+","+O3+","+NO2+","+SO2+","+PM25+","+PM10+","+lati+","+longi;
  Serial.println(cdata);
  nodemcu.println(cdata);
  cdata = "";
  delay(60000);
}

void displayInfo()
{
  
  Serial.print(F("Location: ")); 
 
    lati=(String) ss.location.lat();

    longi=(String)ss.location.lng();
    Serial.println(lati);
    Serial.println(longi);
    
//  }
//   else
//   {
//     Serial.print(F("INVALID"));
//   }


}
boolean readPMSdata(Stream *s) {
  if (! s->available()) {
    return false;
  }
  
  // Read a byte at a time until we get to the special '0x42' start-byte
  if (s->peek() != 0x42) {
    s->read();
    return false;
  }
 
  // Now read all 32 bytes
  if (s->available() < 32) {
    return false;
  }
    
  uint8_t buffer[32];    
  uint16_t sum = 0;
  s->readBytes(buffer, 32);
 
  // get checksum ready
  for (uint8_t i=0; i<30; i++) {
    sum += buffer[i];
  }
 
  /* debugging
  for (uint8_t i=2; i<32; i++) {
    Serial.print("0x"); Serial.print(buffer[i], HEX); Serial.print(", ");
  }
  Serial.println();
  */
  
  // The data comes in endian'd, this solves it so it works on all platforms
  uint16_t buffer_u16[15];
  for (uint8_t i=0; i<15; i++) {
    buffer_u16[i] = buffer[2 + i*2 + 1];
    buffer_u16[i] += (buffer[2 + i*2] << 8);
  }
 
  // put it into a nice struct :)
  memcpy((void *)&data, (void *)buffer_u16, 30);
 
  if (sum != data.checksum) {
    //Serial.println("Checksum failure");
    return false;
  }
  // success!
  return true;
}