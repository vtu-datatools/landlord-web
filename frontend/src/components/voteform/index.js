import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Header, Button, Checkbox, Popup } from "semantic-ui-react";
import StatusMessage from "../statusmessage";
import { castVote } from "../../redux/actions";
import "./styles.css";

const VoteForm = (props) => {
  const { choices, questionText, error, isLoading } = props;
  const [voteInfo, setVoteInfo] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const dispatch = useDispatch();

  if (error || !questionText || !choices || isLoading || choices.length === 0) {
    return (
      <StatusMessage
        error={error || !choices}
        errorClassName="vote-error"
        errorMessage={error}
        loading={isLoading}
        loadingMessage={`We are fetching the vote choices for you`}
        nothing={choices && choices.length === 0}
        nothingMessage={`No vote choices to display`}
        nothingClassName="choices-error"
        type="default"
      />
    );
  }
  const toggleHandler = (item) => () => {
    setVoteInfo((state) => ({
      ...state,
      [item.id]: state[item.id]
        ? null
        : {
            id: item.id,
          },
    }));
  };

  const handleClick = async () => {
    for (const id in voteInfo) {
      if (voteInfo[id] !== null) {
        let id_object = {
          id: id,
        };
        const response = await dispatch(castVote(id_object));
        console.log(response);
        setHasVoted(true);
      }
    }
  };

  if (hasVoted) {
    return (
      <div className="voteContainer">
        <Header as="h1">Thank you for voting!</Header>
      </div>
    );
  } else {
    const voteList = choices.map((choice) => {
      const { name, bio } = choice;
      return (
        <div key={name} className="voteOption">
          <Popup
            content={bio}
            trigger={<Checkbox label={name} onChange={toggleHandler(choice)} />}
            offset={[0, 50]}
            position="right center"
            wide
          ></Popup>
        </div>
      );
    });
    return (
      <div className="voteContainer">
        <Header as="h1" dividing>
          {questionText}
        </Header>
        {voteList}
        <Button
          primary
          type="submit"
          className="btn-vote-submit"
          onClick={handleClick}
        >
          Submit
        </Button>
      </div>
    );
  }
};

export default VoteForm;