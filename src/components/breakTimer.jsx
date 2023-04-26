

function BreakTimer(props){

    return(
        <>
            <h2 id="break-label">Break Length</h2>
            <button onClick={props.decrement} id="break-decrement">-</button>
            <h1 id="break-length">{ props.time }</h1>
            <button onClick={props.increment} id="break-increment">+</button>

        </>
    );

}

export default BreakTimer