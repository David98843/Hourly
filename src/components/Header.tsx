import {useState} from "react"

const Header = () => {
    const [currentTheme, setCurrentTheme] = useState('dark')

    function switchTheme(){
        let themeIcon = document.getElementById('theme-icon')
        themeIcon.classList.toggle('ri-moon-fill')
        themeIcon.classList.toggle('ri-sun-fill')
        let animateTheme = document.getElementById('animate-theme')
        const zoomTheme = [
            {
                width: '0vh',
                height: '0vh',
            },
            {
                width: '200vh',
                height:'200vh',
                transform: 'translate(-100vw, 40vh)',
                display: 'none',
            }
        ]
        // animateTheme.classList.add('add-animation')
        // // animateTheme.animate(zoomTheme, {
        // //     duration : 400,
        // //     easing: 'ease-out'
        // // })

        let allRequired = ['home-cont', 'header', 'calendar-section', 'projects-section', 'todo-section', 'single-project', 'bottom-nav', 'chart-container']
        setTimeout(() => {
            document.body.classList.toggle('body-light')
            allRequired.forEach((id) => {
                let elem = document.querySelector(`div.${id}`)
                elem.classList.toggle(`${id}-light`)
            })            
            animateTheme.classList.remove('add-animation')
        }, 200)

    }
  return (
    <div className='header'>
        <div className="logo">
            <a href="#">
                <img src="/react.svg" alt="Logo" width={'100%'} height={'100%'}/>
            </a>
            Hourly
        </div>
        
        <div className="nav">
            <div className="animate-theme" id='animate-theme'></div>

            <button onClick={() => switchTheme()}>
                <i className='ri-moon-fill' id="theme-icon"></i>
            </button>
            {/* <button>
                <div className="badge">2</div>
                <i className='ri-notification-3-fill'></i>
            </button> */}
        </div>
      
    </div>
  )
}

export default Header
