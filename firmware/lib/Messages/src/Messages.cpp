#include "Messages.h"
#include "Util.h"
#include "Types.h"
#include <math.h>


/*
 * Message class defs
 */
String Transmission::ToString() {
    char buffer [2];
    sprintf(buffer, "%02d", id());
    String result = (String)(char)type() + (String)buffer;
    for (String data : parameters()) {
        result += ", " + data;
    }
    result += "; " + (String)CalculateChecksum();
    result += "\r\n";
    return result;
}

int Transmission::CalculateChecksum() {
    int sum = (int)type();

    char buffer [2];
    sprintf(buffer, "%02d", id());
    for (char character : buffer) {
        sum += (int)character;
    }

    for (String data : parameters()) {
        for (char character : data) {
            sum += (int)character;
        }
    } 
    return sum % 256;
}


/*
 * Query classes
 */
Query::Query() :
    comps_(MessageComponents::Blank())
{}

Query::Query(MessageComponents c) :
    comps_(c)
{}

CommandQuery::CommandQuery(MessageComponents c) :
    Query(c)
{}

RequestQuery::RequestQuery(MessageComponents c) :
    Query(c)
{}


/*
 * Ack
 * id00
 */
std::vector<String> AckRequest::parameters() {
    std::vector<String> empty;
    return empty; 
}

AckRequestQuery::AckRequestQuery(MessageComponents c) :
    RequestQuery(c)
{}

Option<AckRequestQuery> AckRequestQuery::TryCreate(MessageComponents comps) {
    AckRequestQuery qy = AckRequestQuery(comps);
    Option<AckRequestQuery> good = Option<AckRequestQuery>::Some(qy); 
    return good;
}


/*
 * Nack
 * id01
 */
std::vector<String> NackRequest::parameters() {
    std::vector<String> empty;
    return empty; 
}   

NackRequestQuery::NackRequestQuery(MessageComponents c) :
    RequestQuery(c)
{}

Option<NackRequestQuery> NackRequestQuery::TryCreate(MessageComponents c) {
    NackRequestQuery q = NackRequestQuery(c);
    Option<NackRequestQuery> g = Option<NackRequestQuery>::Some(q);
    return g;
}


/*
 * Mode
 * id02
 */
SetModeCommandQuery::SetModeCommandQuery(MessageComponents c, McuMode::Enum mode) :
    CommandQuery(c),
    mode_(mode)
{}

Option<SetModeCommandQuery> SetModeCommandQuery::TryCreate(MessageComponents comps) {
    if (McuMode::Validate(comps.parameters[0].toInt())) {
        McuMode::Enum m = (McuMode::Enum)comps.parameters[0].toInt();
        SetModeCommandQuery qy = SetModeCommandQuery(comps, m);
        Option<SetModeCommandQuery> good = Option<SetModeCommandQuery>::Some(qy);
        return good;
    } else {
        Option<SetModeCommandQuery> bad = Option<SetModeCommandQuery>::None();
        return bad;
    }
}

//todo: see .h
std::vector<String> ModeRequest::parameters() {
    std::vector<String> empty;
    return empty;
}

ModeRequestQuery::ModeRequestQuery(MessageComponents c) :
    RequestQuery(c)
{}

Option<ModeRequestQuery> ModeRequestQuery::TryCreate(MessageComponents c) {
    ModeRequestQuery q = ModeRequestQuery(c);
    Option<ModeRequestQuery> g = Option<ModeRequestQuery>::Some(q);
    return g;
}


/*
 * Gain
 * id03
 */
SetGainCommandQuery::SetGainCommandQuery(MessageComponents c, double gain) :
    CommandQuery(c),
    gain_(abs(gain))
{}

Option<SetGainCommandQuery> SetGainCommandQuery::TryCreate(MessageComponents c) {
    if (StringUtil::IsNumeric(c.parameters[0])) {
        double a = c.parameters[0].toDouble();
        SetGainCommandQuery q = SetGainCommandQuery(c, a);
        Option<SetGainCommandQuery> good = Option<SetGainCommandQuery>::Some(q);
        return good; 
    } else {
        Option<SetGainCommandQuery> bad = Option<SetGainCommandQuery>::None();
        return bad;
    }
}

//todo: see .h
std::vector<String> GainRequest::parameters() {
    std::vector<String> empty;
    return empty;
}

GainRequestQuery::GainRequestQuery(MessageComponents c) :
    RequestQuery(c)
{}

Option<GainRequestQuery> GainRequestQuery::TryCreate(MessageComponents c) {
    GainRequestQuery q = GainRequestQuery(c);
    Option<GainRequestQuery> g = Option<GainRequestQuery>::Some(q);
    return g;
}


/*
 * Frequency
 * id04
 */
SetFrequencyCommandQuery::SetFrequencyCommandQuery(MessageComponents c, unsigned int f) :
    CommandQuery(c),
    freq_(abs(f))
{}

Option<SetFrequencyCommandQuery> SetFrequencyCommandQuery::TryCreate(MessageComponents c) {
    if (StringUtil::IsNumeric(c.parameters[0])) {
        unsigned int f = abs(c.parameters[0].toInt());
        SetFrequencyCommandQuery q = SetFrequencyCommandQuery(c, f);
        Option<SetFrequencyCommandQuery> g = Option<SetFrequencyCommandQuery>::Some(q);
        return g;
    } else {
        Option<SetFrequencyCommandQuery> b = Option<SetFrequencyCommandQuery>::None();
        return b;
    }
}

//todo: see .h
std::vector<String> FrequencyRequest::parameters() {
    std::vector<String> empty;
    return empty;
}

FrequencyRequestQuery::FrequencyRequestQuery(MessageComponents c) :
    RequestQuery(c)
{}

Option<FrequencyRequestQuery> FrequencyRequestQuery::TryCreate(MessageComponents c) {
    FrequencyRequestQuery q = FrequencyRequestQuery(c);
    Option<FrequencyRequestQuery> g = Option<FrequencyRequestQuery>::Some(q);
    return g;
} 


/*
 * MovingAverageActive
 * id05
 */
SetMovingAverageActiveCommandQuery::SetMovingAverageActiveCommandQuery(MessageComponents c, bool act) :
    CommandQuery(c),
    active_(act)
{}

Option<SetMovingAverageActiveCommandQuery> SetMovingAverageActiveCommandQuery::TryCreate(MessageComponents c) {
    if ((bool)c.parameters[0].toInt()) {
        SetMovingAverageActiveCommandQuery q = SetMovingAverageActiveCommandQuery(c, (bool)c.parameters[0].toInt());
        Option<SetMovingAverageActiveCommandQuery> g = Option<SetMovingAverageActiveCommandQuery>::Some(q);
        return g;
    } else {
        Option<SetMovingAverageActiveCommandQuery> b = Option<SetMovingAverageActiveCommandQuery>::None();
        return b;
    }
}

//todo: see .h
std::vector<String> MovingAverageActiveRequest::parameters() {
    std::vector<String> empty;
    return empty;
}

MovingAverageActiveRequestQuery::MovingAverageActiveRequestQuery(MessageComponents c) :
    RequestQuery(c)
{}

Option<MovingAverageActiveRequestQuery> MovingAverageActiveRequestQuery::TryCreate(MessageComponents c) {
    MovingAverageActiveRequestQuery q = MovingAverageActiveRequestQuery(c);
    Option<MovingAverageActiveRequestQuery> g = Option<MovingAverageActiveRequestQuery>::Some(q);
    return g;
}


/*
 * MovingAverageLength
 * id06
 */
SetMovingAverageLengthCommandQuery::SetMovingAverageLengthCommandQuery(MessageComponents c, int l) :
    CommandQuery(c),
    length_(l)
{}

Option<SetMovingAverageLengthCommandQuery> SetMovingAverageLengthCommandQuery::TryCreate(MessageComponents c) {
    if (StringUtil::IsNumeric(c.parameters[0])) {
        int l = abs(c.parameters[0].toInt());
        SetMovingAverageLengthCommandQuery q = SetMovingAverageLengthCommandQuery(c, l);
        Option<SetMovingAverageLengthCommandQuery> g = Option<SetMovingAverageLengthCommandQuery>::Some(q);
        return g;
    } else {
        Option<SetMovingAverageLengthCommandQuery> b = Option<SetMovingAverageLengthCommandQuery>::None();
        return b;
    }
}

//todo: see .h
std::vector<String> MovingAverageLengthRequest::parameters() {
    std::vector<String> empty;
    return empty;
}

MovingAverageLengthRequestQuery::MovingAverageLengthRequestQuery(MessageComponents c) :
    RequestQuery(c)
{}

Option<MovingAverageLengthRequestQuery> MovingAverageLengthRequestQuery::TryCreate(MessageComponents c) {
    MovingAverageLengthRequestQuery q = MovingAverageLengthRequestQuery(c);
    Option<MovingAverageLengthRequestQuery> g = Option<MovingAverageLengthRequestQuery>::Some(q);
    return g;
}