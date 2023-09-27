import Dexie, {Table} from "dexie"

export interface Todo{
    id? : number;
    text: string;
    checked: boolean
}

export interface Pomodoro{
    id? : number;
    date: Date;
}

export interface Project{
    id? : number;
    name: string;
    date: Date;
    tasks: number[];
    status: string
}

export interface Task{
    id? : number;
    name: string;
    status: string;
    subtasks: number[];
    date: Date
}

export interface SubTask{
    id? : number;
    name: string;
    status: string;
}

export interface Activity{
    id : number;
    count: number;
    day: string
}


export class MySubClassedDexie extends Dexie{

    todos!: Table<Todo>;
    pomodoros!: Table<Pomodoro>
    projects!: Table<Project>
    tasks!: Table<Task>
    subtasks!: Table<SubTask>
    activity!: Table<Activity>

    constructor(){
        super('newDb');
        this.version(3).stores({
            todos: '++id, text, checked'
        })
        this.version(3).stores({
            pomodoros: '++id, date'
        })
        this.version(3).stores({
            projects: '++id, name, date, tasks, status' 
        })
        this.version(3).stores({
            tasks: '++id, name, status, subtasks, date'
        })
        this.version(3).stores({
            subtasks: '++id, name, status'
        })
        this.version(5).stores({
            activity: 'id, count, day'
        })
    }
}


export const db = new MySubClassedDexie()