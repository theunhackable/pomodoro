import SessionTimer from "./sessionTimer";
import BreakTimer from "./breakTimer";
import Display from "./display";
import Controls from "./controls";

import {useEffect,useState } from "react";

import _10sec from '../sounds/ticking-clock.mp3';
import alarm from '../sounds/relaxing-box-music.mp3';

let TIMER;

let last_10sec_aud = new Audio(_10sec);
let alarm_aud = new Audio(alarm);

function toMins(time){
    let mins = Math.floor(time / 60);
    let secs = time % 60;
;

    if (mins < 10) {
        mins = "0" + mins;
    }
    if(secs < 10){
        secs = "0" + secs;
    }
    return `${mins}:${secs}`;

}

function Main(){
    
    const [breakTime, setBreakTime] = useState( {total : 300, remaining: 300}); // 300 sec = 5 min
    const [sessionTime, setSessionTime] = useState({total : 1500, remaining: 1500}); // 1500 sec = 25 min
    const [play, setPlay] = useState(false);
    const [timer, setTimer] = useState("Session");
    // pause/play, reset, inc , dec, cloak
    
    useEffect(() => {
        if(play === true){
            // do some shit
            // for session
            if(timer === "Session"){
                TIMER = setInterval(sessionCountDown, 1000);
            }
            if(sessionTime.remaining === 10){
                last_10sec_aud.currentTime = 0;
                alarm_aud.pause();
                last_10sec_aud.play();
            }
            if(sessionTime.remaining === 0){
                setTimer(() => {
                    return "Break"
                });

                setSessionTime((prevData) => {
                    return {
                        total: prevData.total,
                        remaining: prevData.total
                    }
                })
                // pause 10sec aud
                last_10sec_aud.pause();
                alarm_aud.play();

            }
            if(timer === "Break"){
                TIMER = setInterval(breakCountDown, 1000);
            }
            if(breakTime.remaining === 10){
                last_10sec_aud.currentTime = 0;
                alarm_aud.pause();
                last_10sec_aud.play();
            }
            if(breakTime.remaining === 0){
                setTimer(() => {
                    return "Session"
                });

                setBreakTime((prevData) => {
                    return {
                        total: prevData.total,
                        remaining: prevData.total
                    }
                })
                // pause 10sec aud
                last_10sec_aud.pause();
                alarm_aud.play();

            }

        }
        return () => { clearInterval(TIMER)};
    })
    // decrement break time
    function breakCountDown(){
        setBreakTime(
            (prevData) => {
                return {
                    total: prevData.total,
                    remaining: prevData.remaining - 1
                }
            }
        )
    }

    function sessionCountDown(){
        setSessionTime(
            (prevData) => {
                return {
                    total: prevData.total,
                    remaining: prevData.remaining - 1
                }
            }
        ) 
    }
    // function where interval is set to

    function startStop(){
        if(play === false) setPlay(true);
        else setPlay(false);
    }

    function handleReset(event){
        last_10sec_aud.pause();
        alarm_aud.pause();
        // reset everything
        setBreakTime(() => {
            return {
                total : 300, 
                remaining: 300
            }
        });

        // reset session time
        setSessionTime((prevData) => {
            return {
                total: 1500,
                remaining: 1500
            }
        })
        // reset play
        setPlay(() =>{
            return false;
        });
        // reset timer
        // change timer
        setTimer(() => {
            return "Session";
        });


    }
    function handleSessionIncrement() {
        setSessionTime(
            (prevData) => {
                return {
                    total: prevData.total + 60 <=  3600? prevData.total + 60: prevData.total,
                    remaining: prevData.total + 60 <=  3600? prevData.total + 60: prevData.total
                }
            }
        )
    }
    function handleSessionDecrement() {
        setSessionTime(
            (prevData) => {
                return {
                    total: prevData.total - 60 >= 60 ? prevData.total - 60: prevData.total ,
                    remaining: prevData.total - 60 >= 60 ? prevData.total - 60: prevData.total, 
                }
            }
        )
    }
    function handleBreakIncrement() {
        setBreakTime(
            (prevData) => {
                return {
                    total: prevData.total + 60 <=  3600? prevData.total + 60: prevData.total,
                    remaining: prevData.total + 60 <=  3600? prevData.total + 60: prevData.total
                }
            }
        )
    }
    function handleBreakDecrement() {
        setBreakTime(
            (prevData) => {
                return {
                    total: prevData.total - 60 >= 60 ? prevData.total - 60: prevData.total ,
                    remaining: prevData.total - 60 >= 60 ? prevData.total - 60: prevData.total, 
                }
            }
        )
        
    }
    
    return(
        <>
        <BreakTimer time={Math.floor(breakTime.total/60)} increment={handleBreakIncrement} decrement={handleBreakDecrement}/>
        <SessionTimer time={Math.floor(sessionTime.total/60)} increment={handleSessionIncrement} decrement={handleSessionDecrement}/>
        <Display timer={timer} time={timer==="Session"? toMins(sessionTime.remaining):toMins(breakTime.remaining)}/>
        <Controls playPause={startStop} reset={handleReset}/>
        </>
    );
}

export default Main;