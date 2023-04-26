

function SessionTimer(props){
    return(
        <>
            <h2 id="session-label">Session Length</h2>
            <button onClick={props.decrement} id="session-decrement">-</button>
            <h1 id="session-length">{props.time}</h1>
            <button  onClick={props.increment} id="session-increment">+</button>
        </>
    );
}

export default SessionTimer