#pragma once

#include <Arduino.h>
#include "Option.h"

struct MessageType {
    enum class Enum : char {
        Command='C',
        Request='R'
    };

    static bool Validate(char c);
    static Option<MessageType::Enum> Create(char c);
};

struct MessageComponents {
    // vals
    String message;
    MessageType::Enum type;
    int id;
    std::vector<String> parameters;
    int checksum;

    // members
    String RcId();
    String ToString();
    static Option<MessageComponents> FromString(String message);
    static MessageComponents Blank();
};

struct McuMode {
    enum class Enum {
        Command,
        Stream
    };

    static bool Validate(int i);
    static Option<McuMode::Enum> Create(int i);
};