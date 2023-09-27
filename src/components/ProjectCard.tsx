import { useEffect, useState } from "react"
import { useDataLayerValue } from "../DataLayer"
import { db } from "../db"

const ProjectCard = ({project}) : any => {
    const [{currentProject, allProjects, currentProjectID}, dispatch] : any = useDataLayerValue()

    // function setCurrProj(){
    //     let currProject;
    //     allProjects.forEach(value => {
    //       if(value.id == currentProjectID){
    //         currProject = value
    //       }
    //     })
    
    //     dispatch({
    //       type: 'SET_CURRENT_PROJECT',
    //       value: currProject
    //     }) 
    // }

    function showDeleteProject(){
        let deleteCont = document.querySelector('div.delete-project')
        deleteCont.classList.add('show-flex')
        let mainCont = document.querySelector('div.main-cont')
        mainCont.scrollTo({left: 0, top: 0})
        mainCont.classList.add('no-overflow')
        dispatch({
            type: 'SET_DELETE_PROJECT',
            value: project
        })
    }

    function viewProject(){
        let singleProject = document.querySelector('div.single-project')
        singleProject?.classList.remove('remove')
        let mainCont = document.querySelector('div.main-cont')
        mainCont.scrollTo({left: 0, top: 0})
        mainCont.classList.add('no-overflow')
        dispatch({
            type: 'SET_CURRENT_PROJECT_ID',
            value: project.id
        })
    }

  return (
    <div className="project">
        {/* <div className="progress-bar">
            <div className="cont">
                20%
            </div>
        </div> */}
        <div className="info">
            <div>
            <div className="title ellipsis">{project?.name}</div>
            <div className="tasks">
                {
                    project.tasks.length > 0  ?
                    project?.tasks.slice(0,3).map((task : any, id) => {
                        return (
                            <div className="task">
                                <div className="icon">
                                    <i className={`las ${task?.status == 'Completed' ? 'la-check-circle' : 'la-circle'}`}></i>
                                </div>
                                <div className="info">
                                    {task?.name}
                                </div>
                            </div>
                        )
                    })
                    : 
                    <div className="default-info">
                        No task added
                    </div>
                }
            </div>
            </div>
            <div className="actions">
                <button onClick={() => viewProject()}>View</button>
                <button onClick={() => showDeleteProject()}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard
