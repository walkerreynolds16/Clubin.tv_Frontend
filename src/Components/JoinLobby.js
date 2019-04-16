import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../Styles/JoinLobby.css";
import Axios from "axios";
import { API_ENDPOINT, SHOWMAKELOBBYBUTTON } from "../api-config.js";
import titlePic from "../res/title.png";

class JoinLobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lobbyCodeInput: "",
      memberName: "",
      makeTestLobbyCode: ""
    };
  }

  handleLobbyCodeInputChange = event => {
    this.setState({
      lobbyCodeInput: event.target.value.toUpperCase()
    });
  };

  handleMemberNameChange = event => {
    this.setState({
      memberName: event.target.value
    });
  };

  submitLobbyCode = e => {
    if (e !== undefined) {
      e.preventDefault();
    }

    if(this.state.lobbyCodeInput.length == 0 || this.state.memberName.length == 0){
      alert("The fields cannot be empty")
      return
    }

    console.log(this.state.lobbyCodeInput);

    if (this.state.lobbyCodeInput.match(/\d+/g)) {
      console.log("contains number");
    }

    var data = {
      lobbyCode: this.state.lobbyCodeInput,
      memberName: this.state.memberName
    };

    Axios.defaults.headers.post["Content-Type"] = "application/json";

    var url = API_ENDPOINT + "/joinLobby";
    Axios.post(url, data).then(response => {
      console.log(response);

      if (response["data"]["didJoin"]) {
        //Member was able to join lobby, show them the main app page for that lobby
        var data = {
          hasJoined: true,
          lobbyCode: this.state.lobbyCodeInput,
          memberName: this.state.memberName
        };

        this.props.joinedALobby(data);

      } else {
        //Member wasn't able to join, display why not
        alert(response["data"]["Message"]);

        if(response["data"]["Message"] === "Member name already exists"){
          this.setState({
            memberName: ""
          })
        }else {
          this.setState({
            lobbyCodeInput: ""
          });
        }
      }
    });
  };

  makeTestLobby = () => {
    Axios.defaults.headers.post["Content-Type"] = "application/json";

    var url = API_ENDPOINT + "/createLobby";
    Axios.post(url).then(response => {
      console.log(response);

      this.setState({
        lobbyCodeInput: response["data"],
        memberName: "Walker"
      });
    });
  };

  render() {
    return (
      <div className="JoinLobby">
        <header className="JoinLobby-header">
          <img className="JoinLobby-logo-img" src={titlePic} alt="Clubin.tv" />

          <Form onSubmit={this.submitLobbyCode}>
            <Form.Group controlId="formLobbyCode">
              <Form.Label>Lobby Code</Form.Label>
              <Form.Control
                maxLength={4}
                placeholder="Enter 4 letter code"
                onChange={this.handleLobbyCodeInputChange}
                value={this.state.lobbyCodeInput}
              />
            </Form.Group>

            <Form.Group controlId="formMemberName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                maxLength={20}
                placeholder="Enter your name"
                onChange={this.handleMemberNameChange}
                value={this.state.memberName}
              />
            </Form.Group>

            <Button
              onClick={e => {
                this.submitLobbyCode(e);
              }}
              style={{ marginTop: "20px" }}
              type="submit"
            >
              Join Lobby
            </Button>

            {/* Testing stuff */}

            <br />

            {SHOWMAKELOBBYBUTTON && (
              <Button
                onClick={e => {
                  this.makeTestLobby(e);
                }}
                style={{ margin: "20px" }}
              >
                Make lobby
              </Button>
            )}
          </Form>
        </header>
      </div>
    );
  }
}

export default JoinLobby;
