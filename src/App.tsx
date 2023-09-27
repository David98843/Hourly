import { useState, useEffect } from 'react'
import {useLiveQuery} from 'dexie-react-hooks'
import './App.css'
import './icons.css'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Home from './components/Home'
import Projects from './components/Projects'
import Project from './components/Project'
import Pomodoro from './components/PomodoroDialog'
import Todos from './components/Todos'
import PomodoroCTA from './components/PomodoroCTA'
import { Chart } from "chart.js/auto"
import {CategoryScale} from "chart.js"
import {useDataLayerValue} from './DataLayer'
import { db } from './db'
import {getActivity} from './utils/Data' 

Chart.register(CategoryScale)


function App() {
  const [{currentProjectID,  allProjects, allTasks, allSubTasks}, dispatch] : any = useDataLayerValue()
  
  // try{
  //   window.navigation.onnavigate = e => {
  //     let navMap = {
  //       'home': ['home-cont', 0],
  //       'projects': ['projects-section', 1],
  //       'todos': ['todo-section', 2]
  //     }
  //     if(e.navigationType == 'traverse'){
  //       let navItem = navMap[e.destination.url.split('#')[1]]
  //       navigate(navItem[0], navItem[1])
  //     }
  //   }    
  // }catch(e){
  // }


  let allProjects2 = useLiveQuery(() => db.projects.toArray())
  let allTasks2 = useLiveQuery(() => db.tasks.toArray())
  let allSubTasks2 = useLiveQuery(() => db.subtasks.toArray())
  let allActivity = useLiveQuery(() => db.activity.toArray())
  let allTodos = useLiveQuery(() => db.todos.toArray())
  
  async function getAllProjects(){
    let realTasks = [];
    allTasks2.forEach(value => {
      let subs = []
      for(let sub of value.subtasks){
        for(let allSub of allSubTasks2){
          if(sub == allSub.id){
            subs.push(allSub)
          }
        }
      }
      realTasks.push({...value, subtasksID: value.subtasks, subtasks: subs})
    })

    let realProjects = [];
    allProjects2.forEach(value => {
      let tasks = []
      for(let ptask of value.tasks){
        for(let task of realTasks){
          if(ptask == task.id){
            tasks.push(task)
          }
        }
      }
      realProjects.push({...value, tasksID: value.tasks, tasks : tasks})
    })
    dispatch({
      type: 'SET_ALL_PROJECTS',
      value: realProjects.sort(function(a,b){return b.id - a.id})
    })

    let currProject;
    allProjects.forEach(value => {
      if(value.id == currentProjectID){
        currProject = value
      }
    })

    dispatch({
      type: 'SET_CURRENT_PROJECT',
      value: currProject
    })
  }

  useEffect(() => {
    (async function settt(){
      await getData()
    })()
    getAllProjects()
    getActivity()
  }, [allProjects2, allTasks2, allSubTasks2, currentProjectID, allTodos, allActivity])


  const [currentPageID, setCurrentPageID] = useState('home-cont')
  const [currentPageBtnPos, setCurrentPageBtnPos] = useState(0)
  const [Data, setData] = useState([])
  const [chartData, setChartData] = useState({})


  function navigate(id: string, buttonPos: number): any{
      let mainCont = document.querySelector('div.main-cont')
      mainCont.scrollTo({left: 0, top: 0})
      let currentPage : any = document.querySelector(`div.${currentPageID}`);
      let newPage : any = document.querySelector(`div.${id}`);
      let currentProject : any = document.querySelector('div.single-project');
      if(id !== 'projects-section'){
          currentProject.classList.add('remove')
      }

      currentPage.classList.remove('show-section');
      newPage.classList.add('show-section');
      setCurrentPageID(id)

      let allNavBtns : any = [...document.querySelector('div.bottom-nav').children];
      allNavBtns[currentPageBtnPos].classList.remove('active-nav') 
      allNavBtns[buttonPos].classList.add('active-nav')

      setCurrentPageBtnPos(buttonPos);
      
  }

  async function DataFunc(){
    let weekDays = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let Data2 = []
    let allActivity = await db.activity.toArray()
    allActivity.forEach((activity, id) => {
        let activityObj = {}
        activityObj['id'] = activity.id + 1
        activityObj['day'] = weekDays[activity.id]
        activityObj['productivity'] = activity.count
        Data2.push(activityObj)
    })
    return Data2
  }

  async function getData() {
    let res = await DataFunc()
    setData(res)
    setChartData({
      labels: Data.map((data) => data.day),
      datasets: [
        {
          label: 'Productivity',
          data: Data.map((data) => data.productivity),
          fill: true,
          backgroundColor: [
            "#2a71d0",
            "#2a71d0",
            "#2a71d0",
            "#2a71d0",
            "#2a71d0",
            "#2a71d0",
            "#2a71d0",
            "#2a71d0"
          ],
        }
      ]
    })
  }

  return (
    <div className='all-cont'>
      <Header />
      <div className="main-cont">
        <Home chartData={chartData} navigate={navigate}/>
        <Projects/>
        <Todos />
      </div>
      <PomodoroCTA />
      <BottomNav navigate={navigate} />
    </div>
  )
}

export default App
