import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem, Dropdown, DropdownButton } from "react-bootstrap";
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import "../Styles/ManageVideos.css";
import AddVideo from "./AddVideo";

const SortableItem = SortableElement(({value, index, onDeleteVideoCallback, addVideoToLobbyQueue}) => {
  var imageLink = 'http://img.youtube.com/vi/' + value.video.videoId + '/0.jpg'
  return(
    <ListGroupItem key={index} action>
      <div className="ManageVideos-videoList-video-container">
        <img className="ManageVideos-videoList-video-img" src={imageLink} alt={index}/>
        <div className="ManageVideos-videoList-video-metadata-container">
          <h5 className="ManageVideos-videoList-video-metadata-title"> {value.video.videoTitle} </h5>
          <br/>
          <p className="ManageVideos-videoList-video-metadata-channelName">{value.video.channelName}</p>
        </div>
        <div className="ManageVideos-videoList-video-options-container">
          

            {index <= 1 ? (
            <DropdownButton
              size="sm">
              <Dropdown.Item onSelect={() => onDeleteVideoCallback(index)}>Delete</Dropdown.Item>
            </DropdownButton>
            

            ) : (

            <DropdownButton
              size="sm"
              dropup={true}>
              <Dropdown.Item onSelect={() => onDeleteVideoCallback(index)}>Delete</Dropdown.Item>
            </DropdownButton>
            )}

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
              onDeleteVideoCallback={this.props.onDeleteVideoCallback}
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
