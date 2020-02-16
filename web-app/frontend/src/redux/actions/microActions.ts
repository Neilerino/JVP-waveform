interface UpdateTypes {
    type: string;
}

interface UpdateCollect {
    type: string;
    value: boolean;
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