import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "../Styles/LobbyHome.css";
import Axios from "axios";
import { API_ENDPOINT } from "../api-config.js";
import openSocket from "socket.io-client";

import JoinedUsers from "./JoinedUsers";
import AddVideo from "./AddVideo";
import ManageVideos from "./ManageVideos";

const socket = openSocket.connect(API_ENDPOINT, { transports: ["websocket"] });

class LobbyHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lobbyCode: this.props.lobbyCode,
      memberName: this.props.memberName,
      lobbyInfo: {
        currentVideo: -1,
        lobbyCode: this.props.lobbyCode,
        memberList: [],
        videoQueue: [],
        playingVideo: false,
        skippers: []
      },
      showAddVideo: false,
      showJoinedUsers: false,
      showManageVideos: false,
      membersVideos: [],
      isSkipper: false
    };
  }

  componentDidMount() {
    window.addEventListener("beforeunload", ev => this.handleWindowClose(ev));

    socket.emit("Event_mobileConnection", {
      lobbyCode: this.state.lobbyCode,
      memberName: this.state.memberName
    });

    socket.on("Event_lobbyUpdate", data => this.lobbyUpdate(data));

    this.getLobbyInfo();
  }

  lobbyUpdate = (data) => {
    console.log("lobby Update");
    console.log(data["skippers"]);

    this.setState({
      lobbyInfo: {
        currentVideo: data["currentVideo"],
        lobbyCode: data["lobbyCode"],
        memberList: data["memberList"],
        videoQueue: data["videoQueue"],
        playingVideo: data["playingVideo"],
        skippers: data['skippers']
      },
      isSkipper: data['skippers'].includes(this.state.memberName)
    });

    this.updateMembersList(data)
  };

  updateMembersList = (data) => {
    var newList = []

    for(var i = 0; i < data['videoQueue'].length; i++){
      var video = data['videoQueue'][i]

      if(video['memberName'] === this.state.memberName){
        newList.push({'video': video, 'index':i})
      }
    }

    this.setState({
      membersVideos: newList
    })
  }

  handleWindowClose = () => {
    var data = {
      lobbyCode: this.state.lobbyCode,
      memberName: this.state.memberName
    };

    Axios.defaults.headers.post["Content-Type"] = "application/json";

    var url = API_ENDPOINT + "/leaveLobby";
    Axios.post(url, data).then(response => {
      console.log(response);
    });
  };

  getLobbyInfo = () => {
    var url = API_ENDPOINT + "/getLobbyInfo?lobbyCode=" + this.state.lobbyCode;
    Axios.get(url).then(response => {
      console.log(response);
      this.setState({
        lobbyInfo: response["data"]
      });
    });
  };

  clickAddVideo = () => {
    this.setState({
      showAddVideo: true
    });
  };

  onBackToHome = () => {
    this.setState({
      showAddVideo: false,
      showJoinedUsers: false,
      showManageVideos: false
    });

    this.forceUpdate();
  };

  viewJoinedUsers = () => {
    this.setState({
      showJoinedUsers: true
    });
  };

  showManageVideos = () => {
    this.setState({
      showManageVideos: true
    });
  };

  sendVoteToSkip = () => {
    socket.emit("Event_voteSkip", {'memberName': this.state.memberName, 'lobbyCode': this.state.lobbyCode})
  }

  onListSortEnd = ({ oldIndex, newIndex }) => {
    //Switch video spots in the members video list
    var memVidsCopy = this.state.membersVideos.slice()
    var temp = memVidsCopy[newIndex].video

    memVidsCopy[newIndex].video = memVidsCopy[oldIndex].video
    memVidsCopy[oldIndex].video = temp

    
    console.log("New Members Videos List")
    console.log(memVidsCopy)

    this.setState({
      membersVideos: memVidsCopy
    })

    //Recreate the video queue
    var videoQueueCopy = this.state.lobbyInfo.videoQueue.slice()

    for(var i = 0; i < memVidsCopy.length; i++){
      var videoIndex = memVidsCopy[i].index
      videoQueueCopy[videoIndex] = memVidsCopy[i].video
    }

    console.log("New Video Queue")
    console.log(videoQueueCopy)

    this.setState({
      lobbyInfo: {
        videoQueue: videoQueueCopy,
        currentVideo: this.state.lobbyInfo.currentVideo,
        lobbyCode: this.state.lobbyInfo.lobbyCode,
        memberList: this.state.lobbyInfo.memberList,
        playingVideo: this.state.lobbyInfo.playingVideo,
        skippers: this.state.lobbyInfo.skippers
      }
    })

    console.log("new lobby info")
    console.log(this.state.lobbyInfo)

    socket.emit('Event_updateLobbyInfo', {'lobbyCode': this.state.lobbyCode, 'memberName': this.state.memberName, 'lobbyInfo': this.state.lobbyInfo})

  }

  render() {
    console.log("lobbyInfo");
    console.log(this.state.lobbyInfo);

    if (this.state.showAddVideo) {
      return (
        <AddVideo
          lobbyCode={this.state.lobbyCode}
          memberName={this.state.memberName}
          onBackToHome={() => this.onBackToHome()}
        />
      );
    }

    if (this.state.showJoinedUsers) {
      return (
        <JoinedUsers
          onBackToHome={() => this.onBackToHome()}
          users={this.state.lobbyInfo.memberList}
        />
      );
    }

    if (this.state.showManageVideos) {
      return (
        <ManageVideos
          onBackToHome={() => this.onBackToHome()}
          lobbyInfo={this.state.lobbyInfo}
          memberName={this.state.memberName}
          membersVideos={this.state.membersVideos}
          onListSortEnd={this.onListSortEnd}
        />
      );
    }

    return (
      <div className="LobbyHome">

        <header className="LobbyHome-header">
          {!this.state.lobbyInfo.playingVideo && <h3>No one is Playing</h3>}

          {this.state.lobbyInfo.playingVideo && (
            <h3>
              Now Playing - {this.state.lobbyInfo.currentVideo.videoTitle}
            </h3>
          )}
        </header>

        <div className="LobbyHome-button-container">
          {/* <Button onClick={this.clickAddVideo}>Add Video</Button>
          <br /> */}
          <Button onClick={this.showManageVideos}>Manage Videos</Button>
          <br />
          <Button onClick={this.viewJoinedUsers}>View Joined Users</Button>
          <br />

          
          {!this.state.isSkipper &&
            <Button onClick={this.sendVoteToSkip} disabled={!this.state.lobbyInfo.playingVideo}>Vote to Skip Video</Button>
          }

          {this.state.isSkipper &&
            <Button onClick={this.sendVoteToSkip} disabled={!this.state.lobbyInfo.playingVideo}>Remove Skip Vote</Button>
          }


          {this.state.lobbyInfo.playingVideo &&
            <h6>{this.state.lobbyInfo.skippers.length} have skipped out of {this.state.lobbyInfo.memberList.length} total people</h6>
          }
        </div>
      </div>
    );
  }
}

export default LobbyHome;
