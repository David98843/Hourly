const BottomNav = ({navigate}) => {
  return (
    <div className="bottom-nav">
        <a href="#home" className="active-nav" onClick={
            (e) => {
                navigate('home-cont', 0)
            }
        }>
            <i className="ri-home-6-line"></i>
            Home
        </a>  
        <a href="#projects" onClick={
            (e) => {
                navigate('projects-section', 1)
            }
        }>
            <i className="las la-project-diagram"></i>
            Projects
        </a>   
        <a href="#todos" onClick={
            (e) => {
                navigate('todo-section', 2)
            }
        }>
            <i className="ri-list-unordered"></i>
            Todos
        </a>            
    </div>
  )
}

export default BottomNav
