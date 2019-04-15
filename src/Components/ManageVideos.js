import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import "../Styles/ManageVideos.css";
import AddVideo from "./AddVideo";

const SortableItem = SortableElement(({value, index, onDeleteVideoCallback, addVideoToLobbyQueue}) => {
  var imageLink = 'http://img.youtube.com/vi/' + value.video.videoId + '/0.jpg'
  return(
    <ListGroupItem onClick={() => addVideoToLobbyQueue(value.video)} key={index} action>
      <div className="ManageVideos-videoList-video-container">
        <img className="ManageVideos-videoList-video-img" src={imageLink} alt={index}/>
        <div className="ManageVideos-videoList-video-metadata-container">
          <h5 className="ManageVideos-videoList-video-metadata-title"> {value.video.videoTitle} </h5>
          <br/>
          <p className="ManageVideos-videoList-video-metadata-channelName">{value.video.channelName}</p>
        </div>
      </div>
    </ListGroupItem>
  )
  
});

const SortableList = SortableContainer(({items, onDeleteVideoCallback, addVideoToLobbyQueue}) => {
  return (

    <ListGroup>
        {items.map((value, index) => (

          <SortableItem key={`item-${index}`} 
                        index={index} 
                        value={value}
                        onDeleteVideoCallback={onDeleteVideoCallback}
                        addVideoToLobbyQueue={addVideoToLobbyQueue} />
        ))}
    </ListGroup>
  );
});

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

  

  onDeleteVideoCallback = () => {

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

            <SortableList
              items={this.props.membersVideos}
              onSortEnd={this.props.onListSortEnd}
              distance={2}
              onDeleteVideoCallback={this.onDeleteVideoCallback}
              addVideoToLobbyQueue={this.addVideoToLobbyQueue}/>

            
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
