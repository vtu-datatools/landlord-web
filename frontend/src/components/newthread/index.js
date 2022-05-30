import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { getSelectedBlock } from "draftjs-utils";
// import htmlToDraft from "html-to-draftjs";
// import { List } from "immutable";
import { EditorState } from "draft-js";
import { Form, Icon, Divider, Button } from "semantic-ui-react";
import "./styles.css";
import RichEditor from "../richeditor";
import StatusMessage from "../statusmessage";

const NewThread = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  console.log(props);
  const {
    isAuthenticated,
    isLoading,
    success,
    id,
    error,
    showEditor,
    toggleShowEditor,
  } = props;
  if (!isAuthenticated) {
    return <div className="newThread-none" />;
  }
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

  if (!showEditor) {
    console.log("HERE");
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
      <Form loading={isLoading} className="attached fluid segment">
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
          value={name}
          onChange={this.onNameChange}
        />
        <Divider />
        <RichEditor
          placeholder="Start typing your thread content here..."
          editorState={editorState}
          onEditorStateChange={setEditorState}
          // wrapperClassName="newThread-wrapper"
          // toolbarClassName="newThread-toolbar"
          // editorClassName="newThread-editor"
          // handleBeforeInput={this.handleBeforeInput}
          // handlePastedText={this.handlePastedText}
        />
        <Button
          color="blue"
          size="small"
          loading={isLoading}
          disabled={isLoading}
          onClick={this.onSubmit}
        >
          <Icon name="edit" />
          Post thread
        </Button>
        <Button
          color="red"
          role="none"
          size="small"
          disabled={isLoading}
          onClick={this.onSave}
        >
          <Icon name="save" />
          Save Draft
        </Button>
        <Button
          role="none"
          size="small"
          disabled={isLoading}
          onClick={this.onCancel}
        >
          <Icon name="cancel" />
          Clear
        </Button>
      </Form>
    </div>
  );
};

export default NewThread;
