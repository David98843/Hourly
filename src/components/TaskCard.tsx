import SubTaskCard from "./SubTaskCard"
import { db } from "../db"; 
import {useState, useEffect} from "react"
import { useDataLayerValue } from "../DataLayer";
import { addActivity } from "../utils/Data";


const TaskCard = ({task, setCurrProj}): any=> {
  const [{currentProject}, dispatch] : any = useDataLayerValue()
  const [subTaskName, setSubTaskName] = useState('')
  const [newTitle, setNewTitle] = useState('')


  function toggleSubtask(id: string, togglerId : any, parentID: string) : any{
      let subTask: any = document.getElementById(id);
      subTask.classList.toggle('remove')
      let parentTask: any = document.getElementById(parentID)
      parentTask.classList.toggle('main-task')
      let toggler = document.getElementById(togglerId)
      toggler.classList.toggle('left-header')
      toggler.lastElementChild.classList.toggle('rotate-icon')
  }

  function toggleAddSubTask(id:any){
    let todoBox : any = document.querySelector(`div#add-subtask-${id}`)
    todoBox.classList.toggle('show-section')
  }

  async function addSubTask(){
    if(subTaskName.length == 0){
     return 
    }
    toggleAddSubTask(task.id)
    let id = await db.subtasks.add({
      name: subTaskName,
      status: 'not-started',
    })
    await db.tasks.update(task.id, {
      subtasks: [...task.subtasksID, id]
    })
    const inputElem = document.getElementById(`task-input-${task.id}`) as HTMLInputElement
    inputElem.value = ''

    setCurrProj()
    addActivity()
  }

  async function deleteTask(){
    if(task.subtasks.length > 0){
      await db.subtasks.bulkDelete(task.subtasksID)
    }
    await db.tasks.delete(task.id)
    setCurrProj()
  }

  async function updateProgress(currentValue){
    await db.tasks.update(task.id, {
      status: currentValue
    })
    setCurrProj()
    addActivity()
  }


  async function editTask(){
    let titleCont = document.getElementById(`task-title-${task.id}`)
    titleCont.setAttribute('contentEditable', 'true')
    titleCont.focus()
  }

  return (
    <div className={`task ${task.subtasks.length > 0 ? 'main-task' : ''}`} id={`parent-task-${task.id}`}>
      <div className="dialog-box add-subtask" id={`add-subtask-${task.id}`}>
        <div className="title">
          Sub Task Name
        </div>
        <div className="content">
          <input type="text" name="project-name" id={`task-input-${task.id}`} placeholder="Subtask Name" onChange={
            (e) => {
              setSubTaskName((document.getElementById(`task-input-${task?.id}`) as HTMLInputElement).value)
            }
          } />
        </div>
        <div className="buttons">
          <button id='add-task-btn' onClick={
            () => {
              addSubTask()
            }
          }>Add</button>
          <button onClick={(e) => {
            toggleAddSubTask(task.id)
          }}>Cancel</button>
        </div>
      </div>
    <div className="info-cont">
      <div className="cont-1">
        <div className="title-cont">
          <div className="title" id={`task-title-${task?.id}`} spellCheck={false}
          onBlur = {async(e) => {
            e.target.setAttribute('contentEditable', 'false')
            if(newTitle.length <= 2){
              e.target.innerHTML =  task.name
            }else{
              await db.tasks.update(task.id, {
                name: newTitle
              })
            }
          }}
          onInput={(e) => {
            // setNewTitle(e.target.innerText)
            setNewTitle((document.getElementById(`task-title-${task?.id}`) as HTMLDivElement).innerText)
          }}
          >
            {task.name}
          </div>
        </div>
        <div className="progress">
          <select name="progress" id="progress" defaultValue={task?.status} onChange={(e) => updateProgress(e.target.value)}>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>              
      </div>
      <div className="cont-2">
        <button onClick={() => toggleAddSubTask(task.id)}>Add SubTask</button>
        <button onClick={() => editTask()}>Edit Task</button>
        <button onClick={() => deleteTask()}>Delete Task</button>
      </div>
    </div>
    {
      task.subtasks?.length > 0 ? 
        <div className="subtasks">
          <h2 id={`subtask-toggle-${task.id}`} onClick={(e) => {
              toggleSubtask(`subtask-${task.id}`, `subtask-toggle-${task.id}`, `parent-task-${task.id}`)
          }}>SubTasks <i className="las la-angle-down"></i></h2>
          <div className="subtasks-cont" id={`subtask-${task.id}`}>
            {
            task.subtasks.sort((a,b) => {return b.id - a.id}).map((subtask:any, id:number) => {
                return (
                  <SubTaskCard key ={id} subTask= {subtask} taskId = {task.id} setCurrProj={setCurrProj}/>
                )
              })
            }
          </div>

        </div>
      : ''
    }
  </div>
  )
}

export default TaskCard

