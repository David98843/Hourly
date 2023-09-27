export const initialState = {
    currentProject: null,
    currentProjectID: null,
    deleteProject: null,
    user: 'null',
    projects : [],
    allProjects: [],
    allTasks: [],
    allSubTasks: [],
}

const reducer = (state : any, action : any) => {
    switch(action.type){
        case 'SET_CURRENT_PROJECT_ID':
            return {...state, currentProjectID: action.value}
        case 'SET_CURRENT_PROJECT': 
            return {...state, currentProject : action.value}
        case 'SET_PROJECTS':
            return {...state, projects: action.value}
        case 'SET_ALL_PROJECTS':
            return {...state, allProjects: action.value}
        case 'SET_ALL_TASKS':
            return {...state, allTasks: action.value}
        case 'SET_ALL_SUBTASKS':
            return {...state, allSubTasks: action.value}
        case 'SET_DELETE_PROJECT':
            return {...state, deleteProject: action.value}
        default:
            return state; 
    }
}

export default reducer