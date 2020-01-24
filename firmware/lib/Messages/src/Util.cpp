#include "Util.h"

std::vector<String> StringUtil::Split(String string, char splitChar) {
    std::vector<String> result;
    int lastIndex = 0;
    for (int i=0; i<string.length(); i++) {
        if (string.charAt(i) == splitChar) {
            String part = string.substring(lastIndex, i);
            part.trim();
            result.push_back(part);
            lastIndex = i+1;
        }
    }
    if (lastIndex != string.length()-1) {
        String part = string.substring(lastIndex);
        part.trim();
        result.push_back(part);
    }
    return result;
}

int CalculateChecksum(MessageComponents comps) {
    int sum = 0;

    sum += (int)comps.type;

    char buffer [2];
    sprintf(buffer, "%02d", comps.id);
    for (char character : buffer) {
        sum += (int)character;
    }

    for (String data : comps.parameters) {
        for (char character : data) {
            sum += (int)character;
        }
    }

    return sum % 256; 
}

bool ValidateChecksum(MessageComponents comps) {
    return comps.checksum == CalculateChecksum(comps);
}
