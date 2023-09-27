const Pomodoro = () => {
  return (
      <div className="dialog-box start-pomodoro">
        <div className="title">
          Add Todo
        </div>
        <div className="content">
          <input type="text" name="todo-text" id="todo-text" placeholder="e.g Pickup Annie from school" />
        </div>
        <div className="buttons">
          <button id='add-todo-btn' disabled={true}>Add</button>
          <button> Cancel</button>
        </div>
      </div>
  )
}

export default Pomodoro
