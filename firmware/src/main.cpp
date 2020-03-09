#include <Arduino.h>
#include "Messages.h"
#include "Util.h"
#include "Types.h"
#include "Option.h"

void PrintMessageComps(MessageComponents c);

String incomingMsg = "C02, 0; 213\r\n"; // good
// String incomingMsg = "C02, 0; 255\r\n"; // bad checksum
// String incomingMsg = "C02, 2; 213\r\n"; // bad param

StateRequest tx = StateRequest(JvpState::Initial());

void setup() {
    // Serial.begin(115200);
    Serial.begin(9600);
    delay(1000);
    Serial.println();
    Serial.println("Starting...");
    Serial.println();

    Serial.println();
    Serial.println(tx.ToString());
    Serial.println();
}

void loop() {
    Option<MessageComponents> compsOpt = MessageComponents::FromString(incomingMsg);

    if (compsOpt.isSome()) {
        Option<SetModeCommandQuery> msgOpt = SetModeCommandQuery::TryCreate(compsOpt.value());

        if (msgOpt.isSome()) {
            PrintMessageComps(msgOpt.value().Components());
            Serial.println();
        } else {
            Serial.println("Invalid message content");
            Serial.println();  
        }
    } else {
        Serial.println("Invalid message format");
        Serial.println();  
    }

    delay(10000);
}

void PrintMessageComps(MessageComponents c) {
    for (String s : StringUtil::Split(c.ToString(), '\r')) {
        Serial.println(s);
    }
}