interface GainState {
    value: number;
}

interface GainAction {
    type: string;
}

export const gainReducer = (state: any, action: any) => {
    if (state === undefined) {
        state = 1.0;
    } else {
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

    return state;
}
