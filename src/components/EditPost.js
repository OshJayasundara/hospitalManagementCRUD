import React, {Component} from 'react';
import axios from 'axios';

export default class EditPost extends Component{

  constructor(props){
    super(props);
    this.state={
      topic:"",
      description:"",
      postCategory:"",
      date:""
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

    const {topic,description,postCategory,date} = this.state;

    const data={
      topic:topic,
      description:description,
      postCategory:postCategory,
      date:date
    }

    console.log(data)

    axios.put(`/post/update/${id}`,data).then((res)=>{
      if(res.data.success){
        alert("Post Updated Successfully")
        this.setState(
          {
            topic:"",
            description:"",
            postCategory:"",
            date:""
          }
        )
      }
    })

  }

  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/post/${id}`).then((res)=>{
      if(res.data.success){
        this.setState({
          topic: res.data.post.topic,
          description: res.data.post.description,
          postCategory: res.data.post.postCategory,
          date:res.data.post.date
        });

        console.log(this.state.post);
      }
    });
  }

  render(){
    return(
      <div className="col-md-8 mt-4 mx-auto" >
        <h1 className="h3 mb-3 front-weight-normal">Edit post</h1>
        <from className="needs-validation" noValidate>
          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Edit Topic</label>
            <input type="text"
            className="form-control"
            name="topic"
            placeholder="Enter Topic"
            value={this.state.topic}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}> EditDescription</label>
            <input type="text"
            className="form-control"
            name="description"
            placeholder="Enter Description"
            value={this.state.description}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Edit Post Category</label>
            <input type="text"
            className="form-control"
            name="postCategory"
            placeholder="Enter Post Category"
            value={this.state.postCategory}
            onChange={this.handleInputChange}/>
          </div>

          <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Edit Date</label>
            <input type="date"
            className="form-control"
            name="date"
            placeholder="Enter Date"
            value={this.state.date}
            onChange={this.handleInputChange}/>
          </div>

          <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
            &nbsp;Update
          </button>
        </from>
        
      </div>

      );
    }
  }
