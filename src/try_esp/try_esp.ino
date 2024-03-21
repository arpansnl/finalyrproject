#include <SoftwareSerial.h>
//SRX = D2 = GPIO-4; STX = D1 = GPIO-5

void setup()
{
  Serial.begin(9600);

}

void loop()
{
  while (Serial.available() > 0) //show message received from MEGA via SUART Port
  {
    char x = Serial.read();     //charcater has arrived; get it out from Serial Buffer
    Serial.print(x);     //Show it on SM1 (Serial Monitor 1)
  }
}