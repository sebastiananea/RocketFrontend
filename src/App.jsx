import React, {useEffect} from 'react'
import { BrowserRouter, Route, useLocation } from 'react-router-dom'
import './App.css'
import {
  LandingPage,
  Register,
  NavBar,
  Home,
  Profile,
  QueryUser,
  TrueHome,
  Students,
  SideBar,
  TrueLandingPage,
  LandingNoLog,
  InstitutionLogIn,
  RegisterInstitution,
  SidebarInstitution,
  Student,
  Curso
  ActiveAccount
} from './components/index'
console.log(JSON.parse(localStorage.getItem("user")))
function App() {
  
  return (
    <BrowserRouter>
      <div className='App'>
        {/* <Route exact path="/" component={TrueLandingPage} /> */}
        <Route path='/' component={NavBar} /> 
        <Route exact path="/" component={LandingNoLog} />
        <Route path='/home' component={Home} />
        <Route path='/trueHome' component={TrueHome} />
        <Route path='/signin' component={LandingPage} />
        <Route path='/signup/:institution/:curso' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/query/user/:_id' component={QueryUser} />
        <Route path='/institution' component={InstitutionLogIn} />
        <Route path='/register' component={RegisterInstitution} />
        <Route path='/active-account/:token' component={ActiveAccount} />
        <Route path='/admin'> 
            <div className="adminContainer">
            <SideBar/>
            <Route exact path='/admin/students' component={Students} />
            </div>
          </Route>  

          <Route path='/institucion/admin'> 
            <div className="adminContainer">
            <SidebarInstitution/>
            <Route exact path='/institucion/admin/estudiantes' component={Student}  />
            <Route exact path='/institucion/admin/curso' component={Curso}  />
            </div>
          </Route>  

          
      </div>
    </BrowserRouter>
  )
}

export default App
