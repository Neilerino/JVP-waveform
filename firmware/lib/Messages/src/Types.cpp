#include "Types.h"
#include "Util.h"


/*
 * MessageType
 */
Option<MessageType::Enum> MessageType::Create(char c) {
    if (MessageType::Validate(c)) {
        Option<MessageType::Enum> good = Option<MessageType::Enum>::Some((MessageType::Enum)c);
        return good;
    } else {
        Option<MessageType::Enum> bad = Option<MessageType::Enum>::None();
        return bad;
    }
}

bool MessageType::Validate(char c) {
    MessageType::Enum test = (MessageType::Enum)c;
    switch (test) {
        case MessageType::Enum::Request:
            return true;
        case MessageType::Enum::Command:
            return true;
        default:
            return false;
    }
}


/*
 * MessageComponents
 */
String MessageComponents::RcId() {
    char buffer [2];
    sprintf(buffer, "%02d", this->id);
    return (String)(char)this->type + (String)buffer;
}

String MessageComponents::ToString() {
    String res = "";

    String printableMsg = this->message;
    printableMsg.replace("\r\n", "(CR)(LF)");
    res += printableMsg + "\r";
    res += "MessageType: "+ (String)(char)this->type + "\r";
    res += "MessageID: " + (String)this->id + "\r";
    for (String param : this->parameters) {
        res += "Param: " + param + "\r";
    }
    if (ValidateChecksum(*this)) {
        res += "Valid checksum: " + (String)this->checksum;
    } else  {
        res += "Invalid checksum: " + (String)this->checksum;
    }
    return res;
}

Option<MessageComponents> MessageComponents::FromString(String message) {
    std::vector<String> semiColonSplit = StringUtil::Split(message, ';');
    if (semiColonSplit.size() == 2) {
        String half1 = semiColonSplit[0];
        String half2 = semiColonSplit[1];
        half2.replace("\r\n", "");

        // break apart at commas
        std::vector<String> half1Parts;
        half1Parts = StringUtil::Split(half1, ',');

        // collecting and converting to correct types 
        int id = half1Parts[0].substring(1, 3).toInt();
        std::vector<String> params;
        for (int i=1; i<half1Parts.size(); i++) {
            params.push_back(half1Parts[i]);
        }
        int checksum = half2.toInt();

        // rough validation (i.e. is the form correct)
        if (MessageType::Validate(half1Parts[0].charAt(0))) {
            if (id >= 0 and id <= 99) {
                if (checksum >= 0 and checksum <= 255) {
                    MessageComponents comps = {
                        message,
                        MessageType::Create(half1Parts[0].charAt(0)).value(),
                        id,
                        params,
                        checksum
                    };
                    
                    Option<MessageComponents> good = Option<MessageComponents>::Some(comps);
                    return good;
                }
            }
        }
    }

    Option<MessageComponents> bad = Option<MessageComponents>::None();
    return bad;
}

MessageComponents MessageComponents::Blank() {
    std::vector<String> tVec;
    MessageComponents temp = {
        "",
        MessageType::Enum::Command,
        -1,
        tVec,
        -1
    };
    return temp;
}


/*
 * McuMode
 */
Option<McuMode::Enum> McuMode::Create(int i) {
    if (McuMode::Validate(i)) {
        Option<McuMode::Enum> good = Option<McuMode::Enum>::Some((McuMode::Enum)i);
        return good;
    } else {
        Option<McuMode::Enum> bad = Option<McuMode::Enum>::None();
        return bad;
    }
} 

bool McuMode::Validate(int i) {
    McuMode::Enum test = (McuMode::Enum)i;
    switch (test) {
        case McuMode::Enum::Command:
            return true;
        case McuMode::Enum::Stream:
            return true;
        default:
            return false;
    }
}


/*
 * JvpState
 */
JvpState JvpState::Initial() {
    JvpState t = { McuMode::Enum::Command, 1.0, 250, false, 8 };
    return t;
}