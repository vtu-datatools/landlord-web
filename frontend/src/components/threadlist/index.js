import React from "react";
import { Segment } from "semantic-ui-react";
import StatusMessage from "../statusmessage";
import Threads from "./threads";
import "./styles.css";

const ThreadList = (props) => {
  const { isLoading, error, threads } = props;
  if (error || !threads || isLoading || threads.length === 0) {
    return (
      <StatusMessage
        error={error || !threads}
        errorClassName="forum-error"
        errorMessage={error}
        loading={isLoading}
        loadingMessage={`We are fetching the forum for you`}
        nothing={threads && threads.length === 0}
        nothingMessage={`No threads to display`}
        nothingClassName="forum-error"
        type="default"
      />
    );
  }

  return (
    <div className="forumContainer">
      <Segment.Group className="forum-list">
        <Threads threads={threads} />
      </Segment.Group>
    </div>
  );
};

export default ThreadList;
