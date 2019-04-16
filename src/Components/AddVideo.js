import React, { Component } from 'react';
import { Button, Form, Col, Row, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import '../Styles/AddVideo.css';
import Axios from 'axios'
import {API_ENDPOINT, YOUTUBE_API_KEY} from '../api-config.js'

class AddVideo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lobbyCode: this.props.lobbyCode,
      memberName: this.props.memberName,
      searchVideoInput: '',
      searchList: [],
      showAddVideoModal: false,
      modalVideo: {}
    }
  }

  componentDidMount() {
    // window.addEventListener("beforeunload", (ev) => this.handleWindowClose(ev)); 

    window.onpopstate  = (e) => {
      console.log("back")
      this.props.onBackToHome()
    }
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

  handleSearchInputChange = (e) => {
    e.preventDefault()
    this.setState({
      searchVideoInput: e.target.value
    })
  }

  searchForVideo = (e) => {
    if(e !== undefined){
      e.preventDefault()
    }

    var q = this.state.searchVideoInput
    var maxResults = 25
    var url = 'https://www.googleapis.com/youtube/v3/search?q=' + q + '&key=' + YOUTUBE_API_KEY + '&maxResults=' + maxResults + '&part=snippet'

    Axios.get(url)
      .then(response => {
        console.log(response)

        var results = response['data']['items']
        var searchList = []

        for (var i = 0; i < results.length; i++) {
          var item = results[i]

          var videoId = item['id']['videoId']
          var videoTitle = item['snippet']['title']
          var channelName = item['snippet']['channelTitle']
          

          // idString += videoId + ','

          if (videoId !== undefined) {
            //add videos to a list to be displayed on the modal
            searchList.push({ videoId: videoId, videoTitle: videoTitle, duration: '', channelName, viewCount: ''})
          }
        }

        this.setState({
          searchList: searchList
        })
      })


  }

  handleCloseAddVideoModal = () =>{
    this.setState({
      showAddVideoModal: false,
      modalVideo: {}
    })
  }

  handleShowAddVideoModal = (value) =>{
    this.setState({
      showAddVideoModal: true,
      modalVideo: value
    })
  }

  addVideoToLobbyQueue = (value) => {
    console.log(value)

    this.setState({
      showAddVideoModal: false,
      modalVideo: {}
    })

    var data = {
      lobbyCode: this.state.lobbyCode,
      memberName: this.state.memberName,
      video: {"videoId": value.videoId, 'videoTitle': value.videoTitle, 'channelName': value.channelName}
    }

    Axios.defaults.headers.post['Content-Type'] = 'application/json'

    var url = API_ENDPOINT + '/addVideo'
    Axios.post(url, data)
      .then((response) => {
        console.log(response)
      })
  }



  render() {
    return (
      <div >

          <div className="AddVideo-search">
            <form onSubmit={this.searchForVideo}>
              <Form.Group as={Row}>
                <Col >
                  <Form.Control placeholder="Search YouTube" onChange={this.handleSearchInputChange} value={this.state.searchVideoInput} />    
                </Col>

                <Button
                  onClick={this.searchForVideo}>
                  Search
                </Button>

              </Form.Group>

            </form>
          </div>

          <div className="AddVideo-videoList">
            <ListGroup>
              {this.state.searchList.map((value, index) => {
                var imageLink = 'http://img.youtube.com/vi/' + value.videoId + '/0.jpg'

              return (
                <ListGroupItem onClick={() => this.handleShowAddVideoModal(value)} key={index} action>
                  <div className="AddVideo-videoList-video-container">
                    <img className="AddVideo-videoList-video-img" src={imageLink} alt={index}/>
                    <div className="AddVideo-videoList-video-metadata-container">
                      <h5 className="AddVideo-videoList-video-metadata-title"> {value.videoTitle} </h5>
                      <br/>
                      <p className="AddVideo-videoList-video-metadata-channelName">{value.channelName}</p>
                    </div>
                  </div>
                </ListGroupItem>
              )

              })}
            </ListGroup>
          </div>

          <Button className="AddVideo-goBack" onClick={this.props.onBackToHome}>Back</Button>

          <Modal show={this.state.showAddVideoModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Video</Modal.Title>
            </Modal.Header>

            <Modal.Body>              
              <div className="AddVideo-videoList-video-container">
                <img className="AddVideo-videoList-video-img" src={'http://img.youtube.com/vi/' + this.state.modalVideo.videoId + '/0.jpg'} alt={this.state.modalVideo.videoId}/>
                <div className="AddVideo-videoList-video-metadata-container">
                  <h5 className="AddVideo-videoList-video-metadata-title"> {this.state.modalVideo.videoTitle} </h5>
                  <br/>
                  <p className="AddVideo-videoList-video-metadata-channelName">{this.state.modalVideo.channelName}</p>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseAddVideoModal}>Cancel</Button>
              <Button variant="primary" onClick={() => this.addVideoToLobbyQueue(this.state.modalVideo)}>Add Video</Button>
            </Modal.Footer>
          </Modal>

      </div>

    );
  }
}

export default AddVideo;
