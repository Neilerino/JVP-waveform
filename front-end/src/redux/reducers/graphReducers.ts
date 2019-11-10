// TODO: Fix the typing

const graphReducer = (state: any, action: any) => {
    if (state === undefined) {
        state = {
            data: [
                {
                    x: [ 0 ],
                    y: [ 0 ],
                    type: 'scatter'
                }
            ],
            layout: {
                title: 'Jugular Venous Pressure Information',
            }
        }
    }

    switch(action.type) {
        case('UPDATE'):
            Array(state.data[0].x).push(action.data.value);
            Array(state.data[0].y).push(action.data.time);
            return state;
        default:
            return state;
    }
}

export default graphReducer;