#include "DigiPot.h"

DigiPot::DigiPot(int SSPin) :
    SSPin_(SSPin),
    settings_(SPISettings(10000000, MSBFIRST, SPI_MODE0)), //fixme could be LSBFIRST?
    WiperAddr_(0x00),
    TCONAddr_(0x40),
    StatusAddr_(0x50)
{}

void DigiPot::Begin() {
    pinMode(this->SSPin_, OUTPUT);
    digitalWrite(this->SSPin_, HIGH);
    SPI.begin();
    this->Write16(this->TCONAddr_, 0b00001111); // fixme may not be required
}

void DigiPot::ChangeResistance(unsigned long r) {
    int r_whiper = 75; // ohm
    unsigned long r_AB = 100000; // ohm

    // give r the appropriate limits
    if (r > 100075) {
        r = 100075;
    } else if (r < 75)  {
        r = 75;
    }
    r -= r_whiper;

    // calculate wiper position
    int N = (r  * 256 / r_AB) + 0.5;
    if (N > 256) {
        N = 256;
    } else if (N < 0) {
        N = 0;
    }  

    this->Write16(this->WiperAddr_, byte(N));
}

void DigiPot::Write8(byte data) {
    SPI.beginTransaction(this->settings_);
    digitalWrite(this->SSPin_, LOW);
    SPI.transfer(data);
    digitalWrite(this->SSPin_, HIGH);
    SPI.endTransaction();
}

void DigiPot::Write16(byte addr, byte data) {
    SPI.beginTransaction(this->settings_);
    digitalWrite(this->SSPin_, LOW);
    SPI.transfer16(word(addr, data));
    digitalWrite(this->SSPin_, HIGH);
    SPI.endTransaction();
}