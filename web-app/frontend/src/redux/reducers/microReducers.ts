import store from '../../store';

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

// setTimeout(..., 0) makes a function run at the end of the JS Event Loop
// That way the store.getStore() doesn't try and access the store from
// within a running reducer, which would crash the app
const updateMicroprocessor = () => {
    setTimeout(async () => {
        const microData = {
            gainValue: store.getState().gainValue,
            frequencyValue: store.getState().frequencyValue,
            movingAverageValue: store.getState().movingAverageValue,
        }

        await fetch('http://localhost:4000/microprocessor/POST/values', {
            body: JSON.stringify(microData),
            method: 'POST',
            mode: 'no-cors'
        })
    } ,0);
}

export const gainReducer = (state: number = 1.0, action: GainAction) => {
    if (action.type === 'UPDATE_GAIN_VALUE') {
        state = action.value;
        updateMicroprocessor();
    }
    return state;
}

export const collectionReducer = (state: boolean = false, action: CollectionAction) => {
    if (action.type === 'UPDATE_COLLECTING') {
        if (action.value === true) {
            state = true;
            updateMicroprocessor();
        } else if (action.value === false) {
            state = false;
        }
    }
    return state;
}

export const frequencyReducer = (state: number = 1.0, action: FrequencyAction) => {
    if (action.type === 'UPDATE_FREQUENCY') {
        state = action.value;
        updateMicroprocessor();
    }
    return state;
}

export const movingAverageReducer = (state: number | null = null, action: MovingAverageAction) => {
    if (action.type === 'UPDATE_AVERAGE_VALUE') {
        state = action.value;
        updateMicroprocessor();
    }
    return state;
}
