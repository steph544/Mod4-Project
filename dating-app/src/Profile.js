import React from 'react';
import Form from './Form.js';
import Matches from './Matches.js'
import NavBar from './NavBar.js'
import MainContainer from './MainContainer.js'
import { withRouter } from 'react-router-dom';
import Login from "./login.js"
import SideBar from "./SideBar.js"

class Profile extends React.Component {
  state={
    users: [],
    selected: 'match',
  }

  selectedLink=(value)=>{
    this.setState({
      selected: value
    })
  }

  componentDidMount(){
      fetch("http://localhost:3000/api/v1/users",
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.token}`,
          "Content-type": "application/json", 
          "Accept": "application/json"
        } 
      })
      .then(res => res.json())
      .then(data => 
        {
          console.log(data)
        this.setState({
          users: data
        })
      }
      )
  }

  render() {
    return(
      <div>
         { localStorage.token
         ? <div>
              <SideBar selectedLink={this.selectedLink} users={this.state.users}/>
              <NavBar selectedLink={this.selectedLink}/>
              <MainContainer selection={this.state.selected} users={this.state.users} selectedLink={this.selectedLink}/>
           </div>
         : <Login/>
         }
          {/* <Matches/>
          <Form/> */}
          
      </div>
    )
  }
}

export default withRouter(Profile)