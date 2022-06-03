import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EditorState, convertToRaw } from "draft-js";
import { Form, Icon, Button } from "semantic-ui-react";
import "./styles.css";
import RichEditor from "../richeditor";
import StatusMessage from "../statusmessage";

const NewPost = (props) => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const {
    isAuthenticated,
    isLoading,
    error,
    threadID,
    createPost,
    showRegister,
    showLogin,
  } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    let newPost = {
      thread_id: threadID,
      content: content,
    };
    dispatch(createPost(newPost));
  };

  if (!isAuthenticated) {
    return (
      <div className="newPost-none">
        Please
        <br />
        <Button.Group size="large">
          <Button className="btn-sign-in" onClick={showLogin}>
            Login
          </Button>
          <Button.Or />
          <Button className="btn-register" onClick={showRegister}>
            Register
          </Button>
        </Button.Group>
        <br />
        To post
      </div>
    );
  }

  const statusMessage = (
    <StatusMessage
      error={error}
      errorClassName="newPost-message"
      errorMessage={error || "Oops! Something went wrong."}
      type="modal"
    />
  );

  return (
    <div className="newPost-show">
      {statusMessage}
      <Form
        loading={isLoading}
        className="attached fluid segment"
        onSubmit={handleSubmit}
      >
        <RichEditor
          placeholder="Start typing your post content here..."
          editorState={editorState}
          wrapperClassName="newPost-wrapper"
          toolbarClassName="newPost-toolbar"
          editorClassName="newPost-editor"
          onChange={(editorState) => setEditorState(editorState)}
        />
        <Button
          color="blue"
          size="small"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          <Icon name="write" />
          Post
        </Button>
      </Form>
    </div>
  );
};

export default NewPost;
