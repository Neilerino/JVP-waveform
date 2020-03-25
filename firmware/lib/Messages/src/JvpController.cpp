#include "JvpController.h"
#include "Util.h"

JvpController::JvpController(DigiPot& pot, long baudrate) :
    state_(JvpState::Initial()),
    txIntervalMicro_( (1.0/this->state_.frequency) * pow(10, 6) ),
    lastTxTimeMicro_(0),
    baudrate_(baudrate),
    rxBuffer_(std::queue<String>()),
    txBuffer_(std::queue<String>()),
    movingAvgBuffer_(std::list<double>(this->state_.averageLength, 0.0)),
    pot_(pot)
{}

void JvpController::Start() {
    Serial.begin(this->baudrate_);
    this->pot_.Begin();

    while(true) {
        // send Transmissions at appropriate interval as per the state's current mode
        unsigned long now = micros();
        if ( (now - this->lastTxTimeMicro_ >= this->txIntervalMicro_) 
            || (now - this->lastTxTimeMicro_ < 0) ) { // acounting for potential overflow of micros() value
            if (this->state_.mode == McuMode::Enum::Stream) {
                DataRequest dataSample = (this->ReadSensor());
                this->QueueTransmission(dataSample);
            }
            this->SendNextTransmission();
            this->lastTxTimeMicro_ = micros();
        }

        // handle incoming data as per the state's current mode
        // when in stream mode
        this->OnSerialDataAvailable();
        if (this->state_.mode == McuMode::Enum::Stream) {
            // see if commanded to change from stream mode, else ignore message
            Option<MessageComponents> rxCompsOpt = this->NextValidRx();
            if (rxCompsOpt.isSome()) {
                MessageComponents rxComps = rxCompsOpt.value();
                if (rxComps.RcId() == "C02") {
                    Option<SetModeCommandQuery> rxOpt = SetModeCommandQuery::TryCreate(rxComps);
                    if (rxOpt.isSome()) {
                        SetModeCommandQuery rx = rxOpt.value();
                        this->UpdateStateFromQuery(rx);
                    }
                }
            }

        // when in command mode
        } else if (this->state_.mode == McuMode::Enum::Command) {
            Option<MessageComponents> rxCompsOpt = this->NextValidRx();
            if (rxCompsOpt.isSome()) {
                MessageComponents rxComps = rxCompsOpt.value();
                // AckRequestQuery
                if (rxComps.RcId() == "R00") { 
                    Option<AckRequestQuery> rxOpt = AckRequestQuery::TryCreate(rxComps);
                    if (rxOpt.isSome()) {
                        AckRequest tx = AckRequest();
                        this->QueueTransmission(tx);
                    } else {
                        NackRequest tx = NackRequest();
                        this->QueueTransmission(tx);
                    }

                // NackRequestQuery
                } else if (rxComps.RcId() == "R01") {
                    NackRequest tx = NackRequest();
                    this->QueueTransmission(tx);
                
                // SetModeCommandQuery
                } else if (rxComps.RcId() == "C02") {
                    Option<SetModeCommandQuery> rx = SetModeCommandQuery::TryCreate(rxComps);
                    if (rx.isSome()) {
                        this->UpdateStateFromQuery(rx.value());
                        AckRequest tx = AckRequest();
                        this->QueueTransmission(tx);
                    } else {
                        NackRequest tx = NackRequest();
                        this->QueueTransmission(tx);
                    }

                // SetGainCommandQuery
                } else if (rxComps.RcId() == "C03") {
                    Option<SetGainCommandQuery> rx = SetGainCommandQuery::TryCreate(rxComps);
                    if (rx.isSome()) {
                        this->UpdateStateFromQuery(rx.value());
                        AckRequest tx = AckRequest();
                        this->QueueTransmission(tx);
                    } else {
                        NackRequest tx = NackRequest();
                        this->QueueTransmission(tx);
                    }
                
                // SetFrequencyCommandResponse
                } else if (rxComps.RcId() == "C04") {
                    Option<SetFrequencyCommandQuery> rx = SetFrequencyCommandQuery::TryCreate(rxComps);
                    if (rx.isSome()) {
                        this->UpdateStateFromQuery(rx.value());
                        AckRequest tx = AckRequest();
                        this->QueueTransmission(tx);
                    } else {
                        NackRequest tx = NackRequest();
                        this->QueueTransmission(tx);
                    }

                // SetMovingAverageActiveCommandQuery
                } else if (rxComps.RcId() == "C05") {
                    Option<SetMovingAverageActiveCommandQuery> rx = SetMovingAverageActiveCommandQuery::TryCreate(rxComps);
                    if (rx.isSome()) {
                        this->UpdateStateFromQuery(rx.value());
                        AckRequest tx = AckRequest();
                        this->QueueTransmission(tx);
                    } else {
                        NackRequest tx = NackRequest();
                        this->QueueTransmission(tx);
                    }

                // SetMovingAverageLengthCommandQuery
                } else if (rxComps.RcId() == "C06") {
                    Option<SetMovingAverageLengthCommandQuery> rx = SetMovingAverageLengthCommandQuery::TryCreate(rxComps);
                    if (rx.isSome()) {
                        this->UpdateStateFromQuery(rx.value());
                        AckRequest tx = AckRequest();
                        this->QueueTransmission(tx);
                    } else {
                        NackRequest tx = NackRequest();
                        this->QueueTransmission(tx);
                    }

                // StateRequestQuery
                } else if (rxComps.RcId() == "R07") {
                    Option<StateRequestQuery> rx = StateRequestQuery::TryCreate(rxComps);
                    if (rx.isSome()) {
                        StateRequest tx = StateRequest(this->state_);
                        this->QueueTransmission(tx);
                    } else {
                        NackRequest tx = NackRequest();
                        this->QueueTransmission(tx);
                    }

                // DataRequestQuery
                } else if (rxComps.RcId() == "R08") {
                    Option<DataRequestQuery> rx = DataRequestQuery::TryCreate(rxComps);
                    if (rx.isSome()) {
                        DataRequest dataSample = (this->ReadSensor());
                        this->QueueTransmission(dataSample);
                    } else {
                        NackRequest tx = NackRequest();
                        this->QueueTransmission(tx);
                    }

                // handling valid format, but bad message id 
                } else {
                    NackRequest tx = NackRequest();
                    this->QueueTransmission(tx);
                }

            // handling bad message formatting 
            } else { // rxCompsOpt.IsNone()
                NackRequest tx = NackRequest();
                this->QueueTransmission(tx);
            }
        }
    }
}


/*
 * Helper functions
 */  
void JvpController::OnSerialDataAvailable() {
    bool TerminatorPresent = []() {
        return Serial.find('\r') && Serial.find('\n');
    };
    
    while (TerminatorPresent) {
        this->rxBuffer_.push(Serial.readStringUntil('\n'));
    }
}

Option<MessageComponents> JvpController::NextValidRx() {
    while (!this->rxBuffer_.empty()) {
        String rxStr = this->rxBuffer_.front();
        this->rxBuffer_.pop();
        
        Option<MessageComponents> rxCompsOpt = MessageComponents::FromString(rxStr);
        if (rxCompsOpt.isSome()) {
            MessageComponents rxComps = rxCompsOpt.value();
            if (ValidateChecksum(rxComps)) {
                return Option<MessageComponents>::Some(rxComps);
            }
        }
    }

    return Option<MessageComponents>::None();
}

void JvpController::QueueTransmission(Transmission& tx) {
    this->txBuffer_.push(tx.ToString());
}

void JvpController::SendNextTransmission() {
    if (!this->txBuffer_.empty()) {
        while (this->txBuffer_.front().length() > Serial.availableForWrite()) { ; } // delay if buffer is full
        for (char c : this->txBuffer_.front()) {
            Serial.write(c);
        }
        this->txBuffer_.pop();
    }
}

double JvpController::ReadSensor() {
    double reading = analogRead(A0); //fixme no idea what pin is the right pin atm
    reading *= (5 / 1023);
    if (!this->state_.averageActive) {
        return reading;
    } else {
        this->movingAvgBuffer_.push_front(reading);
        this->movingAvgBuffer_.pop_back();
        return AverageList(this->movingAvgBuffer_);
    }
}

void JvpController::UpdateStateFromQuery(SetModeCommandQuery q) {
    this->state_.mode = q.mode();
}

void JvpController::UpdateStateFromQuery(SetGainCommandQuery q) {
    //todo needs to change the resistance on digital pot here
    this->state_.gain = q.gain();
}

void JvpController::UpdateStateFromQuery(SetFrequencyCommandQuery q) {
    this->state_.frequency = q.frequency();
    this->txIntervalMicro_ = (unsigned int)(( 1.0/q.frequency()) * pow(10, 6) );
}

void JvpController::UpdateStateFromQuery(SetMovingAverageActiveCommandQuery q) {
    this->state_.averageActive = q.active();
}

void JvpController::UpdateStateFromQuery(SetMovingAverageLengthCommandQuery q) {
    //fixme need to change size of buffer and transfer contents from old buffer over 
    this->state_.averageLength = q.length();
}