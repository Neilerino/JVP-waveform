#pragma once

#include <Arduino.h>
#include <stdio.h>
#include <vector>
#include "Types.h"
#include "Option.h"


/*
 * Message Abstract Classes
 * Transmission: outgoing from the MCU
 * Query: incoming from the PC
 * Command: sets settings
 * Request: gets settings
 */
class Message {
    public: 
        virtual unsigned int id() = 0;
        virtual MessageType::Enum type() = 0;
        virtual String ToString() = 0;
};

class Transmission : public Message {
    public:
        virtual std::vector<String> parameters() = 0;
        String ToString() override;

    protected:
        int CalculateChecksum();
};

class Command : public Transmission {
    public:
        MessageType::Enum type() { return MessageType::Enum::Command; }
};

class Request : public Transmission {
    public:
        MessageType::Enum type() { return MessageType::Enum::Request; }
};

class Query : public Message {
    public: 
        String ToString() { return comps_.message; }
        MessageComponents Components() { return comps_; }

    protected:
        Query();
        Query(MessageComponents comps);
        MessageComponents comps_;
};

class CommandQuery : public Query {
    public:
        MessageType::Enum type() { return MessageType::Enum::Command; }

    protected:
        CommandQuery() {}
        CommandQuery(MessageComponents comps);
};

class RequestQuery : public Query {
    public:
        MessageType::Enum type() { return MessageType::Enum::Request; }

    protected:
        RequestQuery() {}
        RequestQuery(MessageComponents comps);
};


/* 
 * AckRequest
 * id00 
 */
class AckRequest : public Request {
    public:
        AckRequest() {}
        unsigned int id() { return 0; }         
        std::vector<String> parameters();
};

class AckRequestQuery: public RequestQuery {
    public:
        unsigned int id() { return 0; }
        static Option<AckRequestQuery> TryCreate(MessageComponents comps);
    
    private:
        AckRequestQuery(MessageComponents c);
};


/*
 * NackRequest
 * id01
 */
class NackRequest : public Request {
    public:
        NackRequest() {}
        unsigned int id() { return 1; }
        std::vector<String> parameters();
};

class NackRequestQuery : public RequestQuery {
    public:
        unsigned int id() { return 1; }
        static Option<NackRequestQuery> TryCreate(MessageComponents c);

    private:
        NackRequestQuery(MessageComponents c);
};


/*
 * SetMode C/R
 * id02
 */
class SetModeCommandQuery : public CommandQuery {
    public:
        unsigned int id() { return 2; }
        McuMode::Enum mode() { return mode_; }
        static Option<SetModeCommandQuery> TryCreate(MessageComponents comps);

        //FIXME: see if there's anything that can be done to remove this
        SetModeCommandQuery() {} // !DO NOT USE - required for templating
    private:
        SetModeCommandQuery(MessageComponents c, McuMode::Enum mode);
        McuMode::Enum mode_;
};

class ModeRequest : public Request {
    public:
        ModeRequest() {}
        unsigned int id() { return 2; }
        std::vector<String> parameters();
    
    private:
        //todo: get the var from state and return it
};

class ModeRequestQuery : public RequestQuery {
    public:
        unsigned int id() { return 2; }
        static Option<ModeRequestQuery> TryCreate(MessageComponents c);

    private:
        ModeRequestQuery(MessageComponents c);
};


/*
 * Gain Set
 * id03
 */
class SetGainCommandQuery : public CommandQuery {
    public:
        unsigned int id() { return 3; }
        double gain() { return gain_; }
        static Option<SetGainCommandQuery> TryCreate(MessageComponents c);

        SetGainCommandQuery() {} //FIXME: remove if can?
    private:
        SetGainCommandQuery(MessageComponents c, double gain);
        double gain_;

};  

class GainRequest : public Request {
    public:
        GainRequest() {}
        unsigned int id() { return 3; }
        std::vector<String> parameters();

    private:
        //todo: get current gain from state and return
};

class GainRequestQuery : public RequestQuery {
    public:
        unsigned int id() { return 3; }
        static Option<GainRequestQuery> TryCreate(MessageComponents c);

    private:
        GainRequestQuery(MessageComponents c);
};


/*
 * Frequency
 * id04
 */
class SetFrequencyCommandQuery : public CommandQuery {
    public:
        unsigned int id() { return 4; }
        unsigned int frequency() { return freq_; }
        static Option<SetFrequencyCommandQuery> TryCreate(MessageComponents c);

        SetFrequencyCommandQuery() {} //FIXME: remove?
    private:
        SetFrequencyCommandQuery(MessageComponents c, unsigned int f);
        unsigned int freq_;
};

class FrequencyRequest : public Request {
    public:
        FrequencyRequest() {}
        unsigned int id() { return 4; }
        std::vector<String> parameters();

    private:
        //todo: get current gain from state and return
};

class FrequencyRequestQuery : public RequestQuery {
    public:
        unsigned int id() { return 4; }
        static Option<FrequencyRequestQuery> TryCreate(MessageComponents c);

    private:
        FrequencyRequestQuery(MessageComponents c);
};


/*
 * MovingAverageActive
 * id05
 */
class SetMovingAverageActiveCommandQuery : public CommandQuery {
    public:
        unsigned int id() { return 5; }
        bool active() { return active_; }
        static Option<SetMovingAverageActiveCommandQuery> TryCreate(MessageComponents c);

        SetMovingAverageActiveCommandQuery() {}
    private:
        SetMovingAverageActiveCommandQuery(MessageComponents c, bool act);
        bool active_;
};

class MovingAverageActiveRequest : public Request {
    public:
        MovingAverageActiveRequest() {}
        unsigned int id() { return 5; }
        std::vector<String> parameters();

    private:
        //todo: get current gain from state and return
};

class MovingAverageActiveRequestQuery : public RequestQuery {
    public:
        unsigned int id() { return 5; }
        static Option<MovingAverageActiveRequestQuery> TryCreate(MessageComponents c);

    private:
        MovingAverageActiveRequestQuery(MessageComponents c);
};


/*
 * MovingAverageLength
 * id06
 */
class SetMovingAverageLengthCommandQuery : public CommandQuery {
    public:
        unsigned int id() { return 6; }
        int length() { return length_; }
        static Option<SetMovingAverageLengthCommandQuery> TryCreate(MessageComponents c);

        SetMovingAverageLengthCommandQuery() {}
    private:
        SetMovingAverageLengthCommandQuery(MessageComponents c, int l);
        int length_;
};

class MovingAverageLengthRequest : public Request {
    public:
        MovingAverageLengthRequest() {}
        unsigned int id() { return 6; }
        std::vector<String> parameters();

    private:
        //todo: get current gain from state and return
};

class MovingAverageLengthRequestQuery : public RequestQuery {
    public: 
        unsigned int id() { return 6; }
        static Option<MovingAverageLengthRequestQuery> TryCreate(MessageComponents c);

    private:
        MovingAverageLengthRequestQuery(MessageComponents c);
};