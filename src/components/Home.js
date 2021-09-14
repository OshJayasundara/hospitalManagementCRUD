import React, {Component} from 'react';
import axios from 'axios';


export default class Home extends Component{
constructor(props){
  super(props);


  this.state = {
    posts:[]
  };

}


componentDidMount(){
  this.retrivePosts();
}


retrivePosts(){
  axios.get("/posts").then(res =>{
  if(res.data.success){
    this.setState({
      posts:res.data.existingPosts
    });

    console.log(this.state.posts)
  }

    
  });
}


onDelete = (id)=>{

  axios.delete(`/post/delete/${id}`).then((res)=>{
    alert("Delete Successfully");
    this.retrivePosts();
  })

}

handleSearchArea= (e) =>{

  console.log(e.currentTarget.value);

}

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
        <h4>All Posts</h4>
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
              <th scope = "col">Topic</th>
              <th scope = "col">Description</th>
              <th scope = "col">Post Category</th>
              <th scope = "col">Date</th>
              <th scope = "col">Action</th>

            </tr>
          </thead>
          <tbody>


          </tbody>
          {this.state.posts.map((posts,index) =>(
            <tr key={index}>
              <th scope = "row">{index+1}</th>
              <td>
                <a href={`/post/${posts.id}`} style={{textDecoration:'none'}}>
                  {posts.topic}
                  </a>
                  </td>
              <td>{posts.description}</td>
              <td>{posts.postCategory}</td>
              <td>{posts.date}</td>
              <td>

              < a className= "btn btn-warning" href="#" >
                    <i className ="fas fa-edit"></i> &nbsp;Edit
                  </a>
                &nbsp;
                <a className= "btn btn-danger" href="#" onClick={()=>this.onDelete(posts._id)}>
                    <i className="far fa-trash-alt" style={{color: "black"}}>&nbsp;Delete</i>
                </a>

              </td>

            </tr>

          ))}

        </table>

        <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create New Post</a></button>
        
      </div>
    )
  }
}
 