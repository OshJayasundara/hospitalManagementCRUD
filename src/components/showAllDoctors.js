import React, {Component} from 'react';
import axios from 'axios';


export default class Home extends Component{
constructor(props){
  super(props);


  this.state = {
    doctors:[]
  };

}

componentDidMount(){
  this.retrivePosts();
}

retrivePosts(){
  axios.get("http://localhost:8000/doctor/").then(res =>{
  if(res.data.success){
    this.setState({
        doctors:res.data.existingDoctor
    });

    console.log(this.state.doctors)
    }
  });
}

onDelete = (id)=>{

  axios.delete(`http://localhost:8000/doctor/delete/${id}`).then((res)=>{
      console.log("DI :" +id)
    alert("Delete Successfully");
    this.retrivePosts();
  })

}

filterData(doctors, searchKey) {
  const result = doctors.filter((doctor) => 
    doctor.NIC.toLowerCase().includes(searchKey) || 
    doctor.NIC.toUpperCase().includes(searchKey) ||
    doctor.firstName.toLowerCase().includes(searchKey) ||
    doctor.firstName.toUpperCase().includes(searchKey) ||
    doctor.employeeId.toLowerCase().includes(searchKey) || 
    doctor.employeeId.toUpperCase().includes(searchKey) 
  ) 
  this.setState({doctors:result})
}

handleSearchArea= (e) =>{
  const searchkey = e.currentTarget.value;

  console.log(e.currentTarget.value);
  axios.get("http://localhost:8000/doctor/").then(res =>{
    if(res.data.success){
        this.filterData(res.data.existingDoctor,searchkey)
       }
    });

}

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
        <h4>All existing Doctors (Online)</h4>
        </div>
        <div className="col-lg-3 mt-2 mb-2">
          <input 
          className="form-control"
          type="search"
          placeholder="Search"
          name="searchQuery"
          onChange={this.handleSearchArea}>
            
          </input>
        </div>
      </div>

        <table className = "table table-hover" style={{marginTop:'40px'}}>
          <thead>
            <tr>
              <th scope = "col">#</th>
              <th scope = "col">Employee ID</th>
              <th scope = "col">First Name</th>
              <th scope = "col">Last Name</th>
              <th scope = "col">Mobile Number</th>
              <th scope = "col">NIC</th>
              <th scope = "col">Email</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
          {this.state.doctors.map((doctors,index) =>(
            <tr key={index}>
              <th scope = "row">{index+1}</th>
              <td>
                <a href={`/doctor/${doctors._id}`} style={{textDecoration:'none'}}>
                  {doctors.employeeId}
                </a>
              </td>
              <td>{doctors.firstName}</td>
              <td>{doctors.lastName}</td>
              <td>{doctors.mobileNumber}</td>
              <td>{doctors.NIC}</td>
              <td>{doctors.email}</td>
              <td>

              < a className = "btn btn-warning" href={`/updateDoctor/${doctors._id}`} >
                    <i className ="fas fa-edit"></i> &nbsp;Edit
                  </a>
                &nbsp;
                <a className= "btn btn-danger" href="#" onClick={()=>this.onDelete(doctors._id)}>
                    <i className="far fa-trash-alt" style={{color: "black"}}>&nbsp;Delete</i>
                </a>
              </td>
            </tr>

          ))}

        </table>

        <button className="btn btn-success"><a href="/addDoctor" style={{textDecoration:'none',color:'white'}}>Create New Doctor</a></button>
        
      </div>
    )
  }
}
 