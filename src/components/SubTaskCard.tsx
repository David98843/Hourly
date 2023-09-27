import { db } from "../db"
import { useDataLayerValue } from "../DataLayer"
import { useState } from "react"

const SubTaskCard = ({subTask, taskId, setCurrProj}) : any => {
  const [{currentProject}, dispatch] : any = useDataLayerValue()
  const [newTitle, setNewTitle] = useState('')
 
  async function deleteSubTask(){

    let task = await db.tasks.get(taskId)
    let newTaskSubTasks = task.subtasks.filter((value) => value !== subTask.id)
    await db.tasks.update(taskId, {
      subtasks: newTaskSubTasks
    })
    await db.subtasks.delete(subTask.id)
    setCurrProj()
  }

  async function updateSubTaskProgress(currentValue) {
    await db.subtasks.update(subTask.id, {
      status: currentValue
    })
    setCurrProj()
  }

  async function editSubTask(){
    let subTitleCont = document.getElementById(`subtask-title-${subTask.id}`)
    subTitleCont.setAttribute('contentEditable', 'true')
    subTitleCont.focus()
  }

  return (
    <div className="task subtask" id={`subtask-${subTask?.id}`}>
    <div className="info-cont">
      <div className="cont-1">
        <div className="title-cont">
          <div className="title" id={`subtask-title-${subTask?.id}`} spellCheck={false} 
          onInput={(e) => {
            setNewTitle((document.getElementById(`subtask-title-${subTask?.id}`) as HTMLDivElement).innerText)
          }}
          onBlur={async (e) => {
              e.target.setAttribute('contentEditable', 'false')
              if(newTitle.length <= 2){
                e.target.innerHTML =  subTask.name
              }else{
                await db.tasks.update(subTask.id, {
                  name: newTitle
                })
              }
          }}
          >
            {subTask?.name}
          </div>
        </div>
        <div className="progress">
          <select name="progress" id="progress" defaultValue={subTask?.status} onChange={(e) => updateSubTaskProgress(e.target.value)}>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>              
      </div>
      <div className="cont-2">
        <button onClick={() => editSubTask()}>Edit Subtask</button>
        <button onClick={() => deleteSubTask()}>Delete Subtask</button>
      </div>
    </div>
  </div>
  )
}

export default SubTaskCard
