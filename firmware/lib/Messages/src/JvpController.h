#pragma once

#include <Arduino.h>
#include "Types.h"
#include "Messages.h"
#include "Option.h"
#include <queue>
#include <list>

// todo needs:
// some function to write to the serial buffer
// some function to read the serial buffer
// some function to validate the messages that come from the serial buffer
// something to read from the sensor


class JvpController {
    public:
        //todo need to add ADC pin and spi/i2c pins on creation
        JvpController(long baudrate=115200); // todo try 1152000 (10x default)
        void Start();



    private:
        // fields
        JvpState state_;
        unsigned int txIntervalMicro_;
        unsigned long lastTxTimeMicro_;
        long baudrate_;

        std::queue<String> inputBuffer_;
        std::queue<String> outputBuffer_;
        std::list<double> movingAvgBuffer_; // most recent readings at front of list

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