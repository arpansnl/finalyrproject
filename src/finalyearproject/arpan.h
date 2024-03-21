
#include <Arduino.h>
#include <SoftwareSerial.h>

SoftwareSerial nodemcu(2,3);
float sensor1 = A0;
float sensor2 = A1; 
float sensor3 = A3; 
float sensor4 = A5;
float sdata1 = 0; // sensor1 data
float sdata2 = 0; // sensor2 data
float sdata3 = 0; // sensor3 data
float sdata4 = 0; //sensor4 data
float m7 = -0.6527; 
float b7 = 1.30; 
float R07 = 1.97; 
float m135 = -0.3376; 
float b135 = 0.7165; 
float R0135 = 3.12;
String cdata; // complete data, consisting of sensors values
void mq2();
void mq7();
void mq135();
void dust();
void setup()
{
Serial.begin(9600); 
nodemcu.begin(9600);
pinMode(sensor1, INPUT);
pinMode(sensor2, INPUT);
pinMode(sensor3, INPUT);
pinMode(sensor4, INPUT);
}
void loop()
{
    mq2();
    mq7();
    mq135();
    dust();
   cdata = cdata + sdata1+","+sdata2+","+sdata3+","+sdata4; // comma will be used a delimeter
   Serial.println(cdata); 
   nodemcu.println(cdata);
   cdata = ""; 
   delay(10000);
}
void mq2(){
  float firstVal=analogRead(sensor1);
  float Sv=(firstVal*5.0)/1023.0;
float R0=0.4388;
float b=1.413;
float m=-0.473;
float Rs=(5.0-Sv)/Sv;
float ratio=Rs/R0;
float p=(log10(ratio)-b)/m;
    sdata1=pow(10,p);
}
void mq7(){
 float sensor_volt;
  float RS_gas; 
  float ratio; 
  int sensorValue = analogRead(sensor2); 
  sensor_volt = sensorValue*(5.0/1023.0);
  RS_gas = ((5.0*10.0)/sensor_volt)-10.0;
  ratio = RS_gas/R07;  
  double ppm_log = (log10(ratio)-b7)/m7;  
  double ppm = pow(10, ppm_log); 
  sdata2=ppm;
}
void mq135(){
int sensorValue = analogRead(sensor3); 
  float sensor_volt = sensorValue*(5.0/1023.0);
 float RS_gas = ((5.0*10.0)/sensor_volt)-10.0;
  float ratio = RS_gas/R0135;  
  float ppm_log = (log10(ratio)-b135)/m135; 
  float ppm = pow(10, ppm_log); 
  sdata3=ppm;
}
void dust(){
 float totalVoltage = 0;
  for(int i=0;i<5;i++)
  {
  delayMicroseconds(280);
  totalVoltage += analogRead(sensor4);
  delayMicroseconds(100);
  }
  float voMeasured = totalVoltage;
   float calcVoltage = voMeasured/1024.0 * 5.0;
  float dustDensity = (170* calcVoltage -0.1);
    sdata4 = dustDensity;
}
