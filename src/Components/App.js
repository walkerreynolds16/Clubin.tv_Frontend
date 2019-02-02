import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../Styles/App.css';
import Axios from 'axios'
import {API_ENDPOINT} from '../api-config.js'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lobbyCode: '',
      memberName: '',
      makeTestLobbyCode: ''
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
      <div className="App">
        <header className="App-header">

          

        </header>
      </div>
    );
  }
}

export default App;
