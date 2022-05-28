import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";

const UploadComponent = (props) => {
  const { avatar } = useSelector((state) => ({
    avatar: state.userProfile.profile.avatar,
  }));

  const [file, setFile] = useState([avatar]);
  const { setFieldValue } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue("files", acceptedFiles);
      setFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = file.map((file) => (
    <div key={file.name || file}>
      <div className="editProfile-avatar">
        <img
          src={file.preview || file}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <div>
      {}

      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>To change avatar click or drop new image</p>
        )}
        {thumbs}
      </div>
    </div>
  );
};

export default UploadComponent;
