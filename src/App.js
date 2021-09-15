import React, {Component} from 'react';
import{BrowserRouter,Route} from 'react-router-dom';

import CreatePost from './components/CreatePost';
import PostHome from './components/Home';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';
import NavBar from './components/NavBar';

import DoctorHome from './components/showAllDoctors';
import addDoctor from './components/addNewDoctor'
import updateDoctor from './components/updateDoctor'
import doctorDetails from './components/doctorDetails'

export default class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <div className="container">
  
        <NavBar/>
        <Route path="/post" exact component={PostHome}></Route>
        <Route path="/add" component={CreatePost}></Route>
        <Route path="/edit/:id" component={EditPost}></Route>
        <Route path="/post/:id" component={PostDetails}></Route>

        <Route path="/doctor" exact component={DoctorHome}></Route>
        <Route path="/addDoctor" exact component={addDoctor}></Route>
        <Route path="/updateDoctor/:id" exact component={updateDoctor}></Route>
        <Route path="/doctor/:id" exact component={doctorDetails}></Route>

      </div>

      </BrowserRouter>
    )
  }
} 

