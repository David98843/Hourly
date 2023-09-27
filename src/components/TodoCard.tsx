import { addActivity } from "../utils/Data"
import {db} from "./../db"

const TodoCard = ({todo}) => {
    function checkTodo(checked: boolean){
        db.todos.update(todo.id, {
            checked
        })
        addActivity()
    }

    function deleteTodo(){
        db.todos.delete(todo.id)
    }
    return (
        <div className="todo">
            <div className="check-box">
                <input type="checkbox" checked ={todo.checked} onChange={
                    (e) => {
                        checkTodo(e.currentTarget.checked)
                    }
                }/>
            </div>
            <div className="text">
                {todo?.text}
            </div>

            <div className="action">
                <button onClick = {
                    () => deleteTodo()
                } >X</button>
            </div>
        </div>
    )
}

export default TodoCard
