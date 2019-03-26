import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../Styles/LobbyHome.css';
import Axios from 'axios'
import {API_ENDPOINT} from '../api-config.js'
import openSocket from 'socket.io-client';


import JoinedUsers from './JoinedUsers'
import AddVideo from './AddVideo'

const socket = openSocket.connect(API_ENDPOINT, {transports: ['websocket']})


class LobbyHome extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lobbyCode: this.props.lobbyCode,
      memberName: this.props.memberName,
      lobbyInfo: {"currentVideo": -1, 'lobbyCode': this.props.lobbyCode, 'memberList': [], 'videoQueue': [], 'playingVideo': false},
      showAddVideo: false,
      showJoinedUsers: false
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
    console.log(data['currentVideo'])

    this.setState({
      lobbyInfo: {'currentVideo': data['currentVideo'], 'lobbyCode': data['lobbyCode'], 'memberList': data['memberList'], 'videoQueue': data['videoQueue'], 'playingVideo': data['playingVideo']}
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

  onBackToHome = () => {
    this.setState({
      showAddVideo: false,
      showJoinedUsers: false
    })

    this.forceUpdate()
  }

  viewJoinedUsers = () => {
    this.setState({
      showJoinedUsers: true
    })
  }

  render() {

    console.log('lobbyInfo')
    console.log(this.state.lobbyInfo)

    if(this.state.showAddVideo){
      return(<AddVideo lobbyCode={this.state.lobbyCode} memberName={this.state.memberName} onBackToHome={() => this.onBackToHome()}/>)
    }

    if(this.state.showJoinedUsers){
      return(<JoinedUsers onBackToHome={() => this.onBackToHome()} users={this.state.lobbyInfo.memberList}/>)
    }

    return (
      <div className="LobbyHome">
        <header className="LobbyHome-header">

          {!this.state.lobbyInfo.playingVideo &&
            <h3>No one is Playing</h3>
          }

          {this.state.lobbyInfo.playingVideo  &&
            <h3>Now Playing - {this.state.lobbyInfo.currentVideo.videoTitle}</h3>
          }

        </header> 

        <div className="LobbyHome-button-container">
          <Button onClick={this.clickAddVideo}>Add Video</Button>
          <br/>
          <Button onClick={this.viewJoinedUsers}>View Joined Users</Button>
        </div>
          

        
      </div>
    );
  }
}

export default LobbyHome;
