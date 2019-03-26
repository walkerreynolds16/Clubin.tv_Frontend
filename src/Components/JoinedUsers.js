import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem  } from 'react-bootstrap';
import '../Styles/JoinedUsers.css';



class JoinedUsers extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  

  render() {

    

    return (
      <div className="JoinedUsers">
        <header className="JoinedUsers-header">
            Joined Users
        </header>

        <div className="JoinedUsers-videoList">
            <ListGroup>
              {this.props.users.map((value, index) => {
                var imageLink = 'https://vignette.wikia.nocookie.net/micronations/images/4/41/No-Avatar-High-Definition.jpg/revision/latest?cb=20140823100428'

              return (
                <ListGroupItem key={index} action>
                  <div className="JoinedUsers-videoList-video-container">
                    <img className="JoinedUsers-videoList-video-img" src={imageLink} alt={index}/>

                    <div className="JoinedUsers-videoList-video-metadata-container">
                      <h3 className="JoinedUsers-videoList-video-metadata-name"> {value} </h3>
                    </div>

                  </div>
                </ListGroupItem>
              )

              })}
            </ListGroup>
          </div>

        <Button className="JoinedUsers-goBack" onClick={this.props.onBackToHome}>Back</Button>
      </div>

      
    );
  }
}

export default JoinedUsers;
