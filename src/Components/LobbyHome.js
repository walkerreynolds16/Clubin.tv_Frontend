import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../Styles/LobbyHome.css';
import Axios from 'axios'
import {API_ENDPOINT} from '../api-config.js'
import openSocket from 'socket.io-client';

import AddVideo from './AddVideo'

const socket = openSocket.connect(API_ENDPOINT, {transports: ['websocket']})


class LobbyHome extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lobbyCode: this.props.lobbyCode,
      memberName: this.props.memberName,
      lobbyInfo: {"currentVideo": {'videoId': '', 'videoTitle': ''}, 'lobbyCode': this.props.lobbyCode, 'memberList': [], 'videoQueue': []},
      showAddVideo: false
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) => this.handleWindowClose(ev)); 

    socket.emit("Event_mobileConnection", {'lobbyCode': this.state.lobbyCode, 'memberName': this.state.memberName})

    socket.on('Event_lobbyUpdate', (data) => this.lobbyUpdate(data))

    this.getLobbyInfo()
  }

  lobbyUpdate = (data) => {
    console.log("lobby Update")
    console.log(data)

    this.setState({
      lobbyInfo: {'currentVideo': data['currentVideo'], 'lobbyCode': data['lobbyCode'], 'memberList': data['memberList'], 'videoQueue': data['videoQueue']}
    })
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

  getLobbyInfo = () => {

    var url = API_ENDPOINT + '/getLobbyInfo?lobbyCode=' + this.state.lobbyCode
    Axios.get(url)
      .then((response) => {
        console.log(response)
        this.setState({
          lobbyInfo: response['data']
        })
      })
  }

  clickAddVideo = () => {
    this.setState({
      showAddVideo: true
    })
  }

  render() {

    if(this.state.showAddVideo){
      return(<AddVideo lobbyCode={this.state.lobbyCode} memberName={this.state.memberName}/>)
    }

    return (
      <div className="LobbyHome">
        <header className="LobbyHome-header">

          <h3>Now Playing - {this.state.lobbyInfo.currentVideo.videoTitle}</h3>

          <Button onClick={this.clickAddVideo}>Add Video</Button>

        </header>
      </div>
    );
  }
}

export default LobbyHome;
