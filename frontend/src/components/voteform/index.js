import React, { useState, useEffect } from "react";
import { Button, Checkbox, Popup } from "semantic-ui-react";
import StatusMessage from "../statusmessage";
import "./styles.css";

const VoteForm = (props) => {
  const { options, error, isLoading } = props;
  const [voteInfo, setVoteInfo] = useState({});

  if (error || !options || isLoading || options.length === 0) {
    return (
      <StatusMessage
        error={error || !options}
        errorClassName="vote-error"
        errorMessage={error}
        loading={isLoading}
        loadingMessage={`We are fetching the options for you`}
        nothing={options && options.length === 0}
        nothingMessage={`No options to display`}
        nothingClassName="options-error"
        type="default"
      />
    );
  }
  const toggleHandler = (item) => () => {
    setVoteInfo((state) => ({
      ...state,
      [item.name]: state[item.name]
        ? null
        : {
            name: item.name,
          },
    }));
  };
  console.log(voteInfo);

  //   useEffect(() => {
  //     console.log(voteInfo);
  //   }, [voteInfo]);

  const handleClick = () => {
    console.log("hi");
  };

  const voteList = options.map((option) => {
    const { name, bio } = option;
    return (
      <div key={name} className="voteOption">
        <Popup
          content={bio}
          trigger={<Checkbox label={name} onChange={toggleHandler(option)} />}
          offset={[0, 50]}
          position="right center"
          wide
        ></Popup>
      </div>
    );
  });
  return (
    <div className="voteContainer">
      {voteList}
      <Button type="submit" className="btn btn-primary" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default VoteForm;
