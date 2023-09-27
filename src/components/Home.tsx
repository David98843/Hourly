import Calendar from "./Calendar"
import Barchart from './BarChart'
import {useState, useEffect} from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../db"
import LineChart from "./LineChart"

const Home = ({chartData, navigate}: any) => {
    const numProjects = useLiveQuery(() => db.projects.toArray());
    let numTasks = useLiveQuery(() => db.tasks.toArray());  
    let numTodos = useLiveQuery(() => db.todos.toArray());


  return (
    <div className="home-cont show-section">
        <div className="greeting">
            Welcome 😉
        </div>
        <div className="calendar-1">
            <Calendar />
        </div>

        <div className="cards-section">

            <div className="card">
                <div className="icon">
                    <i className="ri-check-double-fill"></i>
                </div>
                <div className="info">
                    <div className="title">{numTasks?.filter(task => task.status == 'Completed').length} Completed Tasks</div>
                    <a href='#projects' 
                    onClick={
                        (e) => {
                            navigate('projects-section', 1)
                        }
                    }>View All</a>
                </div>
            </div>
            
            <div className="card">
                <div className="icon">
                    <i className="las la-laptop"></i>
                </div>
                <div className="info">
                    <div className="title">{numProjects?.length} Current Projects </div>
                    <a href='#projects' 
                    onClick={
                        (e) => {
                            navigate('projects-section', 1)
                        }
                    }>View All</a>
                </div>
            </div>

            <div className="card">
                <div className="icon">
                    <i className="ri-todo-line"></i>
                </div>
                <div className="info">
                    <div className="title">{numTodos?.length} Current Todos</div>
                    <a href='#todos' 
                    onClick={
                        (e) => {
                            navigate('todo-section', 2)
                        }
                    }>View All</a>
                </div>
            </div>

        </div>

        <div className="bar-chart">
            {chartData.datasets ? <Barchart chartData={chartData}/> : ''}
        </div>

        <div className="line-chart">
            {chartData.datasets ? <LineChart chartData={chartData}/> : ''}
        </div>

        <div className="calendar-2">
            <Calendar/>
        </div>
      
    </div>
  )
}

export default Home
