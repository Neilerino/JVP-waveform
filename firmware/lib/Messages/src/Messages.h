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

class SetModeRequest : public Request {
    public:
        SetModeRequest() {}
        unsigned int id() { return 2; }
        std::vector<String> parameters();
    
    private:
        //todo: get the var from state and return it
};

class SetModeRequestQuery : public RequestQuery {
    public:
        unsigned int id() { return 2; }
        static Option<SetModeRequestQuery> TryCreate();

    private:
        SetModeRequestQuery(MessageComponents c);
};