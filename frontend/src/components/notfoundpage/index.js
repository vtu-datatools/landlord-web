import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import "./styles.css";

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <div className="not-found-page">
          <Message>
            <Message.Content>
              <Message.Header>404 - Page Not Found</Message.Header>
              Sorry, but the page you were trying to view does not exist.
            </Message.Content>
          </Message>
        </div>
      </div>
    );
  }
}
export default NotFoundPage;
