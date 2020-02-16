interface GainAction {
    type: string;
}

interface CollectionAction {
    type: string;
    value: boolean;
}

export const gainReducer = (state: number = 1.0, action: GainAction) => {
    if (action.type === 'increase') {
        state += 0.1;
        return state;
    } else if (action.type === 'decrease') {
        state -= 0.1;
        return state;
    } else {
        return state;
    }
}

export const collectionReducer = (state: boolean = false, action: CollectionAction) => {
    if (action.type === 'UPDATE_COLLECTING') {
        if (action.value === true) {
            state = true;
            return state;
        } else if (action.value === false) {
            state = false;
            return state;
        }
    }
    return state;
}
