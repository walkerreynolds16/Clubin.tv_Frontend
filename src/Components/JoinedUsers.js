import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "../Styles/JoinedUsers.css";

import titlePic from "../res/No-Avatar-High-Definition.jpg";

class JoinedUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="JoinedUsers">
        <header className="JoinedUsers-header">Joined Users</header>

        <div className="JoinedUsers-videoList">
          <ListGroup>
            {this.props.users.map((value, index) => {
              return (
                <ListGroupItem key={index} action>
                  <div className="JoinedUsers-videoList-video-container">
                    <img
                      className="JoinedUsers-videoList-video-img"
                      src={titlePic}
                      alt={index}
                    />

                    <div className="JoinedUsers-videoList-video-metadata-container">
                      <h3 className="JoinedUsers-videoList-video-metadata-name">
                        {value}
                      </h3>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>

        <Button
          className="JoinedUsers-goBack"
          onClick={this.props.onBackToHome}
        >
          Back
        </Button>
      </div>
    );
  }
}

export default JoinedUsers;
