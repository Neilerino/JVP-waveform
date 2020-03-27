#pragma once

#include <Arduino.h>
#include "Types.h"
#include "Messages.h"
#include "Option.h"
#include "DigiPot.h"
#include <queue>
#include <list>

//fixme if Arduino doesnt like it having the looping occur in the setup() block 
// probably break Start() up into:
// Init() which starts the Serial connection and spi/i2c connections
// Cycle() which has the logic to be performed in each mcu cycle

class JvpController {
    public:
        //todo need to add ADC pin and spi/i2c pins on creation
        JvpController(DigiPot& pot, long baudrate=115200); // todo try 1152000 (10x default)
        void Start();

    private:
        // fields
        JvpState state_;
        unsigned int txIntervalMicro_;
        unsigned long lastTxTimeMicro_;
        long baudrate_;

        std::queue<String> rxBuffer_;
        std::queue<String> txBuffer_;
        std::list<double> movingAvgBuffer_; // most recent readings at front of list
        DigiPot& pot_;

        // members
        void OnSerialDataAvailable();
        Option<MessageComponents> NextValidRx();
        void QueueTransmission(Transmission& tx);
        void SendNextTransmission();
        double ReadSensor();

        void UpdateStateFromQuery(SetModeCommandQuery q);
        void UpdateStateFromQuery(SetGainCommandQuery q);
        void UpdateStateFromQuery(SetFrequencyCommandQuery q);
        void UpdateStateFromQuery(SetMovingAverageActiveCommandQuery q);
        void UpdateStateFromQuery(SetMovingAverageLengthCommandQuery q); 
};