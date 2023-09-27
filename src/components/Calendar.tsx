import { useState, useEffect, useRef, useCallback} from "react"
const Calendar = () => {
    const [currentMonthLength , setCurrentMonthLength] = useState(0)
    const [calendarElem, setCalendarElem] = useState(false)
    const [date, setDate] = useState(0)
    const [month, setMonth] = useState(0)
    const monthsLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let monthsArr = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    let currentDate = new Date().getDate()
    let currentMonth = new Date().getMonth()


    const datesCont = useCallback((node: any)=> {
        console.log(node)
        if(node !== null){
            setCurrentMonthLength(monthsLength[currentMonth])
            displayCalendar(node)
            setCalendarElem(true)
        }else{
            setCalendarElem(!calendarElem)
        }
    },[calendarElem])



    function displayCalendar(node: Element){
        if(node.children.length > 10){
            return
        }
        for(let i = 1; i <= currentMonthLength; i++){
            if(i == currentDate){
                node.innerHTML += 
                `
                    <div class="current-date date">${i}</div>
                `                
            }else{
                node.innerHTML += 
                `
                    <div class="date">${i}</div>
                `                
            }
        }
    }

    useEffect(() => {
        function setMonthAndDate(){
            setDate(currentDate)
            setMonth(currentMonth)
        }
        setMonthAndDate()
    }, [])


  return (
    <div className="calendar-section">
      <div className="calendar">
        <div className="current">
            <i className="ri-calendar-line"></i> {monthsArr[month]} {date}, 2023
        </div>
        <div className="all-date" ref={datesCont}>

        </div>
      </div>
    </div>
  )
}

export default Calendar