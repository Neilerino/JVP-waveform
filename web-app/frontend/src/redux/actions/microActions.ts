interface UpdateTypes {
    type: string;
    value: number;
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
    value: number | null;
}

// Todo: This is shit, make it not shit
export const updateGainValue = (updateTypes: UpdateTypes) => {
    return {
        type: updateTypes.type,
        value: updateTypes.value
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
