

function Controls(props) {
    return (
        <>
            <button onClick={props.playPause} id="start_stop">Start/Stop</button>
            <button onClick={props.reset} id="reset">Reset</button>
        </>
    );
}

export default Controls