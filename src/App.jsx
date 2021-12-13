import React, { useEffect } from 'react'
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
  Charts,
  SideBar,
  LandingNoLog,
  InstitutionLogIn,
  RegisterInstitution,
  SidebarInstitution,
  Student,
  Curso,
  ActiveAccount,
  Instructor,
  VerifySale,
  Payment,
  TrueLandingPage,
} from './components/index'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        {/* <Route exact path="/" component={TrueLandingPage} /> */}
        <Route path='/' component={NavBar} />
        <Route exact path='/' component={LandingNoLog} />
        <Route path='/home' component={Home} />
        <Route path='/trueHome' component={TrueHome} />
        <Route path='/signin' component={LandingPage} />
        <Route path='/signup' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/query/user/:_id' component={QueryUser} />
        <Route path='/institution' component={InstitutionLogIn} />
        <Route path='/register' component={RegisterInstitution} />
        <Route path='/active-account/:token' component={ActiveAccount} />
        <Route path='/admin'>
          <div className='adminContainer'>
            <SideBar />
            <Route exact path='/admin/students' component={Students} />
            <Route exact path='/admin/stats' component={Charts} />
            </div>
          </Route>  

          <Route path='/institucion/admin/'> 
            <div className="adminContainer">
            <SidebarInstitution/>
            <Route exact path='/institucion/admin/estudiantes' component={Student}  />
            <Route exact path='/institucion/admin/curso' component={Curso}  />
            <Route exact path='/institucion/admin/instructores' component={Instructor}  />
            <Route exact path='/institucion/admin/payment'  component={Payment}/>
          </div>
        </Route>
       </div> 
    </BrowserRouter>
  )
}

export default App
