interface UpdateTypes {
    type: string;
}

export const updateGainValue = (updateTypes: UpdateTypes) => {
    return {
        type: updateTypes
    };
};