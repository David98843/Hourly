import { useState} from "react";
import { db } from "../db";
import {useLiveQuery} from 'dexie-react-hooks'
import { addActivity } from "../utils/Data";

const PomodoroCTA = () => {
  const [shown, setShown] = useState(false)
  let play : boolean = false
  let timeInterval : any;
  let sec : number = 0;
  let min : number = 0;
  let pomodoroCount : number = 0;
  let breakEnd : boolean = true;

  function strTime (num: number) : string{
    return String(num).length == 1 ? `0${num}` : `${num}`
  }

  async function addPomodoro(){
    await db.pomodoros.add({
      date: new Date()
    })
  }

  let breakTimeout : any;

  function breakNotification(){
    if(!breakEnd){
      breakTimeout = setTimeout(() => {
        createNotification('Break haas ended')
      }, 2000)
    }else{
      clearTimeout(breakTimeout)
    }
  }

  function clearBreak(){
    clearTimeout(breakTimeout);
    breakTimeout = null;
  }

  function timeFunc(){
    let displayCont : any = document.querySelector('button.time-indicator')
    let minDisplay : any = displayCont?.firstElementChild
    let secDisplay : any = displayCont?.lastElementChild

    if(sec >= 5){
      min += 1
      sec = 0
      breakEnd = true
      clearBreak()
    }else{
      sec += 1
      breakEnd = true
      clearBreak()
    }
    if(min == 2){
      pomodoroCount += 1
      createNotification(`Pomodoro ${pomodoroCount} ended. Take a 5 minutes break`)
      addActivity()
      clearInterval(timeInterval)
      addPomodoro()
      clickPlayBtn()
      min = 0
      sec = 0
      breakEnd = false
      breakNotification()
    }
    minDisplay.innerHTML = strTime(min)
    secDisplay.innerHTML = strTime(sec)
  }
  

  function notifyMe() {
    Notification.requestPermission()

  }
  
  function showPomodoro(){
    let playBtn : any = document.querySelector('button.play-btn');
    let timeIndicator : any = document.querySelector('button.time-indicator');
    let pomodoroCont = document.getElementById('pom-cont');
    pomodoroCont?.classList.toggle('gap-10');

    if(shown){
      playBtn.style.animationName = 'fadeOutPlayBtn'
      timeIndicator.style.animationName = 'fadeOutTimeIndicator'
      setShown(false)
    }else{
      playBtn.style.animationName = 'fadePlayBtn'
      timeIndicator.style.animationName = 'fadeTimeIndicator'
      setShown(true)
    }
    playBtn.classList.toggle('show')
    timeIndicator.classList.toggle('show')
  }

  function requestNotificationPermisssion() : any{
    Notification.requestPermission()
  }

  function createNotification(text: string){
    const img = '/react.svg';
    const notification = new Notification('Hourly', {
      body: text,
      icon: img
    })
    document.addEventListener('visibilitychange', () => notification.close())
  }

  function clickPlayBtn(){
    let playIcon = document.querySelector('button.play-btn')?.firstElementChild
    playIcon?.classList.toggle('ri-play-fill')
    playIcon?.classList.toggle('ri-pause-fill')
    play = !play
  }



  function togglePomodoro(){
    // if(Notification.permission != 'granted'){
    //   requestNotificationPermisssion()
    // }
    requestNotificationPermisssion()

    clickPlayBtn()

    if(play){
      timeInterval = setInterval(timeFunc, 1000)
    }else {
      clearInterval(timeInterval)
    }
  }

  return (
    <div className="add-cta">
        <div className="cont" id="pom-cont">
          <button className="play-btn">
            <i className="ri-play-fill" onClick={(e) => togglePomodoro()}></i>
          </button> 
          <button className="time-indicator">
            <span>00</span>:
            <span>00</span>
          </button>          
          <button onClick={
            (e) => {
              alert('Coming soon')
              // showPomodoro()
            }
          }>
            <i className="ri-timer-line"></i>
          </button>
        </div>
    </div>
  )
}

export default PomodoroCTA
