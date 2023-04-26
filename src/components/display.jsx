function Display(props){
    
    return(
        <>
            <h2 id="timer-label">{props.timer}</h2>
            <h1 id="time-left">{props.time}</h1>
        </>
    )
}

export default Display;