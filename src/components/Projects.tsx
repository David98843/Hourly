import ProjectCard from "./ProjectCard"
import Project from "./Project"
import { db } from "../db"
import {useLiveQuery} from "dexie-react-hooks"
import { useDataLayerValue } from "../DataLayer"
import { useState } from "react"
import { addActivity } from "../utils/Data"

const Projects = () => {
  const [{allProjects, deleteProject}, dispatch]: any = useDataLayerValue()
  const [projectName, setProjectName] = useState('')
  // const [completedProjects, setCompletedProjecs] = useState([])

  function toggleAddProject(){
    let todoBox : any = document.querySelector('div.add-project')
    let input = document.getElementById('project-name-input')
    todoBox.classList.toggle('show-section')
    if(todoBox.classList.contains('show-section')){
      input.focus()
    }
  }

  function getTaskCategory(category){
    let allCategory  = deleteProject.tasks.filter(value => value.status == category)
    // setCompletedProjecs(allCompleted)
    return allCategory.length
  }


  function cancelDeleteProject(){
    let deleteCont = document.querySelector('div.delete-project')
    deleteCont.classList.remove('show-flex')
    let mainCont = document.querySelector('div.main-cont')
    mainCont.classList.remove('no-overflow')
  }

  async function addProject(){

    if(projectName.length == 0){
      return
    }

    await db.projects.add({
      name: projectName,
      date: new Date(),
      status: 'not-started',
      tasks: [],
    })
    addActivity()
    const inpElem = document.getElementById('project-name-input') as HTMLInputElement
    inpElem.value = ''
    toggleAddProject()
  }

  async function deleteProjectFunc(){
    let projectTasks = deleteProject.tasks
    projectTasks.forEach(async(task) => {
      if(task.subtasks.length > 0){
        await db.subtasks.bulkDelete(task.subtasksID)
      }
      await db.tasks.delete(task.id)
    })
    await db.projects.delete(deleteProject.id)
    cancelDeleteProject()
  }

  return (
    <div className="projs-section">
    <div className="dialog-box add-project">
      <div className="title">
        Add Project
      </div>
      <div className="content">
        <input type="text" name="project-name" id="project-name-input" placeholder="e.g Build a todo app" onChange={
          (e) => {
            setProjectName(e.target.value)
          }
        } />
      </div>
      <div className="buttons">
        <button id='add-todo-btn' onClick={
          () => {
            addProject()
          }
        }>Add</button>
        <button onClick={(e) => {
          toggleAddProject()
        }}>Cancel</button>
      </div>
    </div>
    <div className="full-page-cont delete-project">
      <div className="dialog-box confirm show-section">
          <div className="title">
            DELETE PROJECT
            <i className="ri-delete-bin-fill"></i>
          </div>
          <div className="content">
            <div className="info">Are you sure you want to delete this project?</div>
            <div className="stats">
              <div className="stat">
                <div className="icon">
                  Total
                  <i className="ri-todo-fill"></i>
                </div>
                <div className="text">
                  {deleteProject?.tasks.length} Tasks
                </div>
              </div>
              <div className="stat">
                <div className="icon">
                  Completed
                  <i className="ri-checkbox-circle-fill"></i>
                </div>
                <div className="text">
                  {
                    deleteProject ? getTaskCategory('Completed') : 0 
                  } Tasks
                </div>
              </div>
              <div className="stat">
                <div className="icon"> In Progress
                  <i className="ri-checkbox-indeterminate-fill"></i>
                </div>
                <div className="text">
                  {
                    deleteProject ? getTaskCategory('In Progress') : 0 
                  } Tasks
                </div>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button onClick={() => deleteProjectFunc()}>DELETE</button>
            <button onClick={() => cancelDeleteProject()}>Cancel</button>
          </div>
      </div>      
    </div>
    <Project/>
    <div className="projects-section section">
      <div className="titlee">
        <h2>Projects</h2>
        <div className="action">
          <button onClick={() => toggleAddProject()}>Add Project</button>
        </div>
      </div>
        <div className="projects-cont">
          { allProjects?.length > 0 ?
            allProjects?.map((project, id) => {
              return(
                <ProjectCard key = {id} project={project} />
              )
            })
            : <div className="default-info">No Projects</div>
          }
        </div>
    </div>
    </div>
  )
}

export default Projects
