#pragma once

#include <vector>
#include <Arduino.h>
#include "Types.h"

struct StringUtil {
    static std::vector<String> Split(String string, char splitChar);
    static bool IsNumeric(String s);
};

int CalculateChecksum(MessageComponents comps);

bool ValidateChecksum(MessageComponents comps);
