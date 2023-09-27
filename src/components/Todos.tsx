import { useState, useEffect } from "react"
import TodoCard from "./TodoCard"
import {Todo, db} from "./../db"
import {useLiveQuery} from 'dexie-react-hooks'
import { addActivity } from "../utils/Data"



const Todos = () => {
  const [todoText, setTodoText] = useState('')
  let todos = useLiveQuery(
    () => db.todos.toArray()
  )
  // if(todos.length > 0){}
  todos?.sort(function(a,b){ return b.id - a.id})

  function toggleAddTodo(){
    let todoBox : any = document.querySelector('div.add-todo')
    todoBox.classList.toggle('show-section')
    let input = document.getElementById('todo-text')
    if(todoBox.classList.contains('show-section')){
      input.focus()
    }
  }

  async function addTodo(){
    if(todoText.length == 0){

    }else{
      const id = await db.todos.add({
        text: todoText,
        checked: false
      })
      toggleAddTodo() 
      const inputElem = document.getElementById('todo-text') as HTMLInputElement;
      inputElem.value = ''
      addActivity()
    }
  }
  return (
    <div className="todo-section section">
      <div className="dialog-box add-todo">
        <div className="title">
          Add Todo
        </div>
        <div className="content">
          <input type="text" name="todo-text" id="todo-text" placeholder="e.g Pickup Annie from school" onChange={
            (e) => {
              setTodoText(e.target.value)
            }
          } />
        </div>
        <div className="buttons">
          <button id='add-todo-btn' onClick={
            () => {
              addTodo()
            }
          }>Add</button>
          <button onClick={(e) => {
            toggleAddTodo()
          }}>Cancel</button>
        </div>
      </div>
    <div className="titlee">
        <h2>Todos</h2>
        <div className="action">
            <button 
              onClick={
                (e) => {
                  toggleAddTodo()
                }
            }>Add Todo</button>
        </div>
    </div>

      <div className="todo-container">
        {todos?.length > 0 ?
          todos?.map((todo:Todo, id:number) => {
            return(
              <TodoCard key={id} todo={todo}/>
            )
          })
          : 
          <div className = 'default-info'>No todos added</div>
        }
      </div>
    </div>
  )
}

export default Todos
