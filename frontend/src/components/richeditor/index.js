import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { imageUploadApi } from "../../api";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";

const RichEditor = (props) => {
  const { editorState, onChange, readOnly } = props;
  const uploadImageCallBack = (file) => {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
      imageUploadApi(file, false)
        .then((response) => {
          /* react-draft-wywsgi need data.link as the uploaded image url
          so we had to slightly modify the result from cloudinary response */
          let newResponse = {
            data: {
              link: response.data.secure_url,
            },
          };
          resolve(newResponse);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <Editor
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "emoji",
          "image",
          "history",
        ],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        image: {
          uploadCallback: uploadImageCallBack || this.uploadImageCallBack,
          alt: { present: true },
          previewImage: true,
        },
        fontFamily: {
          options: [
            "Arial",
            "Georgia",
            "Impact",
            "Tahoma",
            "Roboto",
            "Times New Roman",
            "Verdana",
          ],
        },
      }}
      editorState={editorState}
      onEditorStateChange={onChange}
      readOnly={readOnly}
      toolbarHidden={readOnly}
    />
  );
};

export default RichEditor;
