#pragma once

#include <Arduino.h>
#include <SPI.h>


//for MCP4152 chip
class DigiPot {
    public:
        DigiPot(int SSPIn);
        void Begin();
        void ChangeResistance(unsigned long r);

    private:
        //members
        void Write8(byte data);
        void Write16(byte addr, byte data);

        //fields
        int SSPin_; 
        SPISettings settings_;

        const byte WiperAddr_;
        const byte TCONAddr_;
        const byte StatusAddr_;
};