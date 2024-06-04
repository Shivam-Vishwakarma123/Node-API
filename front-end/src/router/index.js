import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home.js'
import About from '../pages/About.js'
import Contact from '../pages/Contact.js'

function MyRouter() {
    return(
        <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/home' element={ <Home />} />
            <Route path='/about-us' element={ <About />} />
            <Route path='/contact-us' element={ <Contact />} />
        </Routes>
    )
}

export default MyRouter;