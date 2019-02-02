import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../Styles/LobbyHome.css';
import Axios from 'axios'
import {API_ENDPOINT} from '../api-config.js'

class LobbyHome extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lobbyCode: this.props.lobbyCode,
      memberName: this.props.memberName
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) => this.handleWindowClose(ev));
  }

  handleWindowClose = () => {
    var data = {
      lobbyCode: this.state.lobbyCode,
      memberName: this.state.memberName
    }

    Axios.defaults.headers.post['Content-Type'] = 'application/json'

    var url = API_ENDPOINT + '/leaveLobby'
    Axios.post(url, data)
      .then((response) => {
        console.log(response)
      })
  }

  


  render() {
    return (
      <div className="LobbyHome">
        <header className="LobbyHome-header">

          <h1>U have joined lobby {}</h1>

        </header>
      </div>
    );
  }
}

export default LobbyHome;
