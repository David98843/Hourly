import TaskCard from "./TaskCard"
import { useDataLayerValue } from "../DataLayer"
import { useState, useEffect } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "../db"
import { addActivity } from "../utils/Data"

const Project = () : any => {
  const [{currentProject, currentProjectID, allProjects}, dispatch] : any = useDataLayerValue()
  const [taskName, setTaskName] = useState('')

  function setCurrProj(){
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
    setCurrProj()
  },[allProjects])

  function closeProject(){
    let project = document.querySelector('div.single-project')
    project?.classList.add('remove')
    let mainCont = document.querySelector('div.main-cont')
    mainCont.classList.remove('no-overflow') 
    let headerr = document.querySelector('div.header')
    headerr.classList.remove('remove')
  }

  function toggleAddTask(){
    let todoBox : any = document.querySelector('div.add-task')
    todoBox.classList.toggle('show-section')
    let input = document.getElementById('task-name-input') as HTMLInputElement
    input.value = ''
    if(todoBox.classList.contains('show-section')){
      input.focus()
    }
  }

  async function addTask(){
    if(taskName.length == 0){
     return 
    }
    let id = await db.tasks.add({
      name: taskName,
      date: new Date(),
      status: 'not-started',
      subtasks: []
    })
    await db.projects.update(currentProjectID, {
      tasks: [...currentProject.tasksID, id ]
    })
    addActivity()
    toggleAddTask()
  }

  return (
      <div className="single-project remove">
      <div className="dialog-box add-task">
        <div className="title">
          Task Name
        </div>
        <div className="content">
          <input type="text" name="task-name-input" id="task-name-input" placeholder="e.g Pickup Annie from school" onChange={
            (e) => {
              setTaskName(e.target.value)
            }
          } />
        </div>
        <div className="buttons">
          <button id='add-task-btn' onClick={
            () => {
              addTask()
            }
          }>Add</button>
          <button onClick={(e) => {
            toggleAddTask()
          }}>Cancel</button>
        </div>
      </div>
      <div className="title">
        <h2><i className="ri-todo-fill"></i> {currentProject?.name}</h2>
      </div>
      <div className="info-2">
        <div>
          <button onClick = {() => toggleAddTask()}>Add Task</button>
        </div>

        <div className="close-icon">
          <button onClick={() => closeProject()}>
            <i className="ri-arrow-go-back-fill"></i>
          </button>
        </div>
      </div>
      <div className="info">
        <div className="date-time">
          <i className="ri-time-line"></i> {currentProject?.date.toDateString()}
        </div>
        <div className="descr">
          Description: 
          <div className="char-length">
            <div className="chars">50</div>/100
          </div>
          <div className="content">A step by step roadmap of how we'll plan and build Menano</div>
        </div>
      </div> 
      { currentProject?.tasks.length > 0 ?
        <div className="tasks">
        {
          currentProject?.tasks.map((task, id) => {
            return(
              <TaskCard key={id} task={task} setCurrProj={setCurrProj}/>
            )
          })
        }
        {/* <TaskCard/> */}
        {/* <TaskCard/> */}
        </div>
        : 
        <div className="default-info mt-5 p-5">
          No task added
        </div>
      }
    </div>
  )
}

export default Project
