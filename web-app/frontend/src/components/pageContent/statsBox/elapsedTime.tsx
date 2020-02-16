import React, {useState, useEffect} from 'react';

interface ElapsedTimeProps {
    collecting: boolean
}

interface ElapsedTimeState{
    time: Date,
    intervalId: NodeJS.Timeout | undefined | any
}

const ElapsedTime: React.FC<ElapsedTimeProps> = (props: ElapsedTimeProps) => {

    const [state, setState] = useState<ElapsedTimeState>({
        time: new Date(new Date().setHours(0,0,0,0)),
        intervalId: undefined,
    });

    const increaseTime = () => {
        state.time.setSeconds(Number(state.time.getSeconds()) + 1);
        setState(state);
    }

    useEffect(() => {
        if (props.collecting === true) {
            state.time.setHours(0, 0, 0, 0);
            state.intervalId = setInterval(increaseTime, 1000);
        } else {
            clearInterval(state.intervalId);
        }
    });
    
    return (
        <div className="elapsed-time">
            { state.time.getHours() }:{ state.time.getMinutes() }:{ state.time.getSeconds() }
        </div>
    );
};

export default ElapsedTime;