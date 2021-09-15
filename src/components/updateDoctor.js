import React, {Component} from 'react';
import axios from 'axios';

export default class EditPost extends Component{

  constructor(props){
    super(props);
    this.state={
        employeeId : "",
        firstName : "",
        middleName : "",
        lastName : "",
        mobileNumber : "",
        NIC : "",
        DOB : "",
        email : ""
    }
  }

  handleInputChange = (e) =>{
    const{name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })
  }

  onSubmit=(e)=>{
   
    e.preventDefault();
    const id = this.props.match.params.id;

    const { employeeId, firstName, middleName, lastName, mobileNumber, NIC, DOB, email } = this.state;

    const data={
        employeeId:employeeId,
        firstName:firstName,
        middleName:middleName,
        lastName:lastName,
        mobileNumber: mobileNumber,
        NIC: NIC,
        DOB: DOB,
        email: email
    }

    console.log(data)

    axios.put(`http://localhost:8000/doctor/update/${id}`,data).then((res)=>{
      if(res.data.success){
        alert("Doctor Updated Successfully")
        this.setState(
          {
            employeeId : "",
            firstName : "",
            middleName : "",
            lastName : "",
            mobileNumber : "",
            NIC : "",
            DOB : "",
            email : ""
          }
        )
      }
    })

  }

  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`http://localhost:8000/doctor/${id}`).then((res)=>{
      if(res.data.success){
        this.setState({
            employeeId:res.data.doctor.employeeId,
            firstName:res.data.doctor.firstName,
            middleName:res.data.doctor.middleName,
            lastName:res.data.doctor.lastName,
            mobileNumber:res.data.doctor.mobileNumber,
            NIC:res.data.doctor.NIC,
            DOB:res.data.doctor.DOB,
            email:res.data.doctor.email
        });

        console.log(this.state.doctor);

      }
    });
  }

  render(){
    return(
        <div className="col-md-8 mt-4 mx-auto" >
        <h1 className="h3 mb-3 front-weight-normal">Update Doctor</h1>
        <from className="needs-validation" noValidate>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Employee ID</label>
            <input type="text"
            className="form-control"
            name="employeeId"
            placeholder="Enter Employee ID"
            value={this.state.employeeId}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>First Name</label>
            <input type="text"
            className="form-control"
            name="firstName"
            placeholder="Enter First Name"
            value={this.state.firstName}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Middle Name</label>
            <input type="text"
            className="form-control"
            name="middleName"
            placeholder="Enter Middle Name"
            value={this.state.middleName}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Last Name</label>
            <input type="text"
            className="form-control"
            name="lastName"
            placeholder="Enter Last Name"
            value={this.state.lastName}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Mobile Number</label>
            <input type="text"
            className="form-control"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            value={this.state.mobileNumber}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>National Identicard Number</label>
            <input type="text"
            className="form-control"
            name="NIC"
            placeholder="Enter National Identicard Number"
            value={this.state.NIC}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Birth Day</label>
            <input type="date"
            className="form-control"
            name="date"
            placeholder="Enter Birth Day"
            value={this.state.DOB}
            onChange={this.handleInputChange}/> 
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Email Address</label>
            <input type="text"
            className="form-control"
            name="email"
            placeholder="Enter Email Address"
            value={this.state.email}
            onChange={this.handleInputChange}/>
          </div>

          <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp;Save
          </button>
        </from>
        
      </div>

      );
    }
  }
