import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home.js'
import About from '../pages/About.js'
import Contact from '../pages/Contact.js'
import EmployeeList from '../pages/Employee.js'
import AddEmployee from '../pages/AddEmployee.js'

function MyRouter() {
    return(
        <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/home' element={ <Home />} />
            <Route path='/about-us' element={ <About />} />
            <Route path='/contact-us' element={ <Contact />} />
            <Route path='/employee' element={ <EmployeeList />} />
            <Route path='/add-employee' element={ <AddEmployee />} />
        </Routes>
    )
}

export default MyRouter;