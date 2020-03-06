interface GainAction {
    type: string;
    value: number;
}

interface CollectionAction {
    type: string;
    value: boolean;
}

interface FrequencyAction {
    type: string;
    value: number;
}

interface MovingAverageAction {
    type: string,
    value: number,
}

export const gainReducer = (state: number = 1.0, action: GainAction) => {
    if (action.type === 'UPDATE_GAIN_VALUE') {
        state = action.value
    }
    return state;
}

export const collectionReducer = (state: boolean = false, action: CollectionAction) => {
    if (action.type === 'UPDATE_COLLECTING') {
        if (action.value === true) {
            state = true;
        } else if (action.value === false) {
            state = false;
        }
    }
    return state;
}

export const frequencyReducer = (state: number = 1.0, action: FrequencyAction) => {
    if (action.type === 'UPDATE_FREQUENCY') {
        state = action.value;
    }
    return state;
}

export const movingAverageReducer = (state: number | null = null, action: MovingAverageAction) => {
    if (action.type === 'UPDATE_AVERAGE_VALUE') {
        state = action.value;
    }
    return state;
}
