// TODO: Fix the typing

const graphReducer = (state: any, action: any) => {
    if (action.type === 'UPDATE_GRAPH') {
        state.data[0].y.push(action.data.value);
        state.data[0].x.push(action.data.time);
        state.layout.datarevision++;
        state.revision++;
        console.log(state.revision);

    } else if (state === undefined) {
        const currentTime = new Date();
        state = {
            data: [
                {
                    x: [ currentTime.toTimeString().split(' ')[0] ],
                    y: [ 0 ],
                    type: 'scatter'
                }
            ],
            layout: {
                title: 'Jugular Venous Pressure Information',
                width: 700,
                height: 600,
                datarevision: 0
            },
            revision: 0
        }
    }

    return state;
}

export default graphReducer;
