#include "Messages.h"
#include "Util.h"
#include "Types.h"


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
 * AckRequest 
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
 * NackRequest class defs
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
 * SetModeCommand
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

/*
 * SetModeRequest
 */
std::vector<String> SetModeRequest::parameters() {
    std::vector<String> empty;
    return empty;
}

SetModeRequestQuery::SetModeRequestQuery(MessageComponents c) :
    RequestQuery(c)
{}