import React from "react";
import { Editor } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";

const RichEditor = (props) => {
  const { editorState, onChange, readOnly } = props;
  return (
    <Editor editorState={editorState} onChange={onChange} readOnly={readOnly} />
  );
};

export default RichEditor;
