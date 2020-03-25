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

bool StringUtil::IsNumeric(String s) {
    bool good = true;
    s.trim();
    for (char c : s) {
        if (!(c == '0' or c == '1' or c == '2' or c == '3' or c == '4' or c == '5' or 
            c == '6' or c == '7' or c == '8' or c == '9' or c == '.')) {
                good = false;
        }
    } 
    return good;
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

double AverageList(std::list<double> l) {
    double temp = 0.0;
    for (double e : l) {
        temp += e;
    }
    return temp / l.size();
}
