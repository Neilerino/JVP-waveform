interface UpdateTypes {
    type: string;
}

interface UpdateCollect {
    type: string;
    value: boolean;
}

interface UpdateFreq {
    type: string;
    value: number;
}

interface UpdateAverage {
    type: string;
    value: number;
}

// Todo: This is shit, make it not shit
export const updateGainValue = (updateTypes: UpdateTypes) => {
    return {
        type: updateTypes
    };
};

export const updateCollecting = (updateCollect : UpdateCollect) => {
    return {
        type: updateCollect.type,
        value: updateCollect.value,
    }
}

export const updateFrequency = (updateFreq: UpdateFreq) => {
    return {
        type: updateFreq.type,
        value: updateFreq.value,
    } 
}

export const updateAverageFilter = (updateAverage: UpdateAverage) => {
    return {
        type: updateAverage.type,
        value: updateAverage.value,
    }
}
