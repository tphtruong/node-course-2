import React, { Component } from "react";
import "../assets/styles/Chat.css";

import { Sidebar } from "./SidebarContainer"
import { MessagesList } from "./MessageListContainer"
import { AddMessage } from "./AddMessageContainer"

class ChatContainer extends Component {
  render() {
    return (
      <div id="chat-container">
        <Sidebar />
        <section id="main">
          <MessagesList />
          <AddMessage />
        </section>
      </div>
    );
  }
}

export default ChatContainer;