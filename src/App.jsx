import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
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
  Payment,
  Tables,
  Cursos
} from './components/index'


function App() {
    const user = useSelector(state => state.user)
  
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Route exact path="/" component={TrueLandingPage} /> */}
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={LandingNoLog} />
        <Route path="/home" component={Home} />
        <Route path="/trueHome" component={TrueHome} />
        <Route path="/signin" component={LandingPage} />
        <Route path="/signup" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/query/user/:_id" component={QueryUser} />
        <Route path="/institution" component={InstitutionLogIn} />
        <Route path="/register" component={RegisterInstitution} />
        <Route path="/active-account/:token" component={ActiveAccount} />
        
        {user && user.moderator && (<Route path="/admin">
          <div className="adminContainer">
            <SideBar />
            <Route exact path='/admin/students' component={Students} />
            <Route exact path='/admin/stats' component={Charts} />
            <Route exact path='/admin/tables' component={Tables} />
            
            
            </div>
          </Route>  )}

        {user && user.suscription && (
          <Route path='/institucion/admin/'> 
            <div className="adminContainer">
            <SidebarInstitution/>
            <Route exact path='/institucion/admin/estudiantes' component={Student}  />
            <Route exact path='/institucion/admin/instructores' component={Instructor}  />
            <Route exact path='/institucion/admin/curso' component={Curso}  />
            <Route exact path='/institucion/admin/payment'  component={Payment}/>
            <Route exact path='/institucion/admin/Cursos' component={Cursos} />

          </div>
        </Route>)}
      </div>
    </BrowserRouter>
  );
}

export default App;
