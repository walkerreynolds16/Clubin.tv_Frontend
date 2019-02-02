import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import JoinLobby from './JoinLobby'
import LobbyHome from './LobbyHome'

class MainAppRouter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasJoinLobby: false,
      joinedLobbyCode: '',
      memberName: ''
    }
  }

  joinedALobby = (val) => {
    console.log(val)
    this.setState({
      hasJoinLobby: val['hasJoined'],
      joinedLobbyCode: val['lobbyCode'],
      memberName: val['memberName']
    })
  }



  render() {

    return (
      <div>
        <Router>
          <div>

            <Route exact path='/' render={
              (props) => this.state.hasJoinLobby ? (<LobbyHome {...props} 
                                                                lobbyCode={this.state.lobbyCode} 
                                                                memberName={this.state.memberName} />) 
                                                                
                                                  : (<JoinLobby {...props}
                                                                joinedALobby={this.joinedALobby}/>)
            } />

          </div>

        </Router>

      </div>
    )
  }
}


export default MainAppRouter;
