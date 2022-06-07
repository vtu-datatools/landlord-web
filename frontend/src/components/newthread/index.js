import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import { Form, Icon, Divider, Button } from "semantic-ui-react";
import "./styles.css";
import RichEditor from "../richeditor";
import StatusMessage from "../statusmessage";

const NewThread = (props) => {
  const dispatch = useDispatch();
  const [showEditor, setShowEditor] = useState(false);
  const [threadName, setThreadName] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const {
    isLoading,
    isAuthenticated,
    forum,
    createThread,
    success,
    id,
    error,
  } = props;

  if (!isAuthenticated) {
    return <div className="newThread-none" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    let newThread = {
      name: threadName,
      forum: forum,
      content: content,
    };
    dispatch(createThread(newThread));
  };

  const statusMessage = (
    <StatusMessage
      error={error}
      errorClassName="newThread-message"
      errorMessage={error || "Oops! Something went wrong."}
      success={success}
      successClassName="newThread-message"
      successMessage={
        <Link to={`/thread/${id}`}>{"Successful on creating thread"}</Link>
      }
      type="modal"
    />
  );
  const toggleShowEditor = () => setShowEditor((value) => !value);
  if (!showEditor) {
    return (
      <div>
        {statusMessage} {/*this will only show the success message*/}
        <div className="newThread-hidden">
          <Button
            size="small"
            color="blue"
            floated="left"
            onClick={toggleShowEditor}
          >
            <Icon name="edit" />
            New Thread
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="newThread-show">
      {statusMessage}
      <Form
        loading={isLoading}
        onSubmit={handleSubmit}
        className="attached fluid segment"
      >
        <Form.Input
          required
          fluid
          transparent
          icon="edit"
          iconPosition="left"
          size="big"
          placeholder="Name"
          type="text"
          name="name"
          value={threadName}
          onChange={(threadName) => setThreadName(threadName.target.value)}
        />
        <Divider />
        <RichEditor
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
        />
        <Button
          color="blue"
          size="small"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          <Icon name="edit" />
          Post Thread
        </Button>
      </Form>
    </div>
  );
};

export default NewThread;
