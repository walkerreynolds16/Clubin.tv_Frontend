import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "../Styles/ManageVideos.css";
import AddVideo from "./AddVideo";

class ManageVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddVideos: false
    };
  }

  showAddVideos = () => {
    this.setState({
      showAddVideos: true
    });
  };

  onBackToManageVideos = () => {
    this.setState({
      showAddVideos: false
    })
  }

  render() {
    if (this.state.showAddVideos) {
      return (
        <AddVideo
          lobbyCode={this.props.lobbyInfo.lobbyCode}
          memberName={this.props.memberName}
          onBackToHome={() => this.onBackToManageVideos()}
        />
      );
    }

    return (
      <div className="ManageVideos">
        <header className="ManageVideos-header">
          <h4>Manage Your Videos</h4>
        </header>

        <Button className="ManageVideos-addvideo-button" onClick={this.showAddVideos}>Add a Video</Button>


        <div className="ManageVideos-videoList">
            <ListGroup>
              {this.props.membersVideos.map((value, index) => {
                var imageLink = 'http://img.youtube.com/vi/' + value.videoId + '/0.jpg'

              return (
                <ListGroupItem onClick={() => this.addVideoToLobbyQueue(value)} key={index} action>
                  <div className="ManageVideos-videoList-video-container">
                    <img className="ManageVideos-videoList-video-img" src={imageLink} alt={index}/>
                    <div className="ManageVideos-videoList-video-metadata-container">
                      <h5 className="ManageVideos-videoList-video-metadata-title"> {value.videoTitle} </h5>
                      <br/>
                      <p className="ManageVideos-videoList-video-metadata-channelName">{value.channelName}</p>
                    </div>
                  </div>
                </ListGroupItem>
              )

              })}
            </ListGroup>
          </div>

        <Button
          className="ManageVideos-goBack"
          onClick={this.props.onBackToHome}
        >
          Back
        </Button>
      </div>
    );
  }
}

export default ManageVideos;
