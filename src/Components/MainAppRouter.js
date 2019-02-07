import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom";
import JoinLobby from './JoinLobby'
import LobbyHome from './LobbyHome'


class MainAppRouter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasJoinLobby: false,
      lobbyCode: '',
      memberName: ''
    }
  }

  joinedALobby = (val) => {
    console.log(val)
    this.setState({
      hasJoinLobby: val['hasJoined'],
      lobbyCode: val['lobbyCode'],
      memberName: val['memberName']
    })
    
  }



  render() {

    // if(this.state.hasJoinLobby){
    //   return(<Redirect to={'/lobby/' + this.state.lobbyCode}/>)
    // }

    return (
      <div>
        <Router>
          <div>

            {/* {this.state.hasJoinLobby &&
              <Route path={'/lobby/' + this.state.lobbyCode} render={(props) => <LobbyHome {...props} lobbyCode={this.state.lobbyCode} memberName={this.state.memberName}/>}/>
            }

            {!this.state.hasJoinLobby &&
              <Route exact path='/' render={(props) => <JoinLobby {...props} joinedALobby={this.joinedALobby}/>}/>
            } */}
            
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
