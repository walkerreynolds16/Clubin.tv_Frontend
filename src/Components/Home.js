import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../Styles/Home.css';
import Axios from 'axios'
import {API_ENDPOINT} from '../api-config.js'

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lobbyCodeInput: '',
      memberName: '',
      makeTestLobbyCode: ''
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) => this.handleWindowClose(ev));
  }

  handleWindowClose = () => {
    Axios.defaults.headers.post['Content-Type'] = 'application/json'

    var url = API_ENDPOINT + ''
    Axios.post(url)
      .then((response) => {
        console.log(response)

        this.setState({
          makeTestLobbyCode: response['data']
        })
      })
  }

  handleLobbyCodeInputChange = (event) => {
    this.setState({
      lobbyCodeInput: event.target.value
    })
  }

  handleMemberNameChange = (event) => {
    this.setState({
      memberName: event.target.value
    })
  }

  submitLobbyCode = (e) => {
    e.preventDefault()
    console.log(this.state.lobbyCodeInput)

    if(this.state.lobbyCodeInput.match(/\d+/g)){
      console.log('contains number')
    }

    var data = {
      lobbyCode: this.state.lobbyCodeInput,
      memberName: this.state.memberName,
    }

    Axios.defaults.headers.post['Content-Type'] = 'application/json'

    var url = API_ENDPOINT + '/joinLobby'
    Axios.post(url, data)
      .then((response) => {
        console.log(response)
      })

  }

  makeTestLobby = () => {
    Axios.defaults.headers.post['Content-Type'] = 'application/json'

    var url = API_ENDPOINT + '/createLobby'
    Axios.post(url)
      .then((response) => {
        console.log(response)

        this.setState({
          makeTestLobbyCode: response['data']
        })
      })
  }


  render() {
    return (
      <div className="Home">
        <header className="Home-header">

          <form onSubmit={(e) => this.submitLobbyCode(e)}>
            <h3 style={{'color':'black'}}>Lobby Code</h3>
            <input 
              value={this.state.lobbyCodeInput} 
              onChange={this.handleLobbyCodeInputChange} 
              placeholder={'Enter 4 letter code'} 
              maxLength={4} 
              autoFocus />
            
            <input 
              value={this.state.memberName} 
              onChange={this.handleMemberNameChange} 
              placeholder={'Enter your name'} 
              maxLength={20} 
              style={{'marginTop':'10px'}} 
              autoFocus />
              
            <br/>

            <Button 
              onClick={(e) => { this.submitLobbyCode(e) }} 
              style={{'marginTop':'10px'}}>
              Join Lobby
            </Button>

            <Button 
              onClick={(e) => { this.makeTestLobby(e) }} 
              style={{'margin':'20px'}}>
              Make lobby
            </Button>

            <h3>{this.state.makeTestLobbyCode}</h3>

          </form>

        </header>
      </div>
    );
  }
}

export default Home;
