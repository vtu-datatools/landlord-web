import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestion } from "../../redux/actions";

import VoteForm from "../../components/voteform";

function VoteContainer() {
  const dispatch = useDispatch();

  const { question } = useParams();

  useEffect(() => {
    dispatch(fetchQuestion(question));
  }, [dispatch]);

  const { choices, questionText, error, isLoading } = useSelector((state) => ({
    choices: state.vote.choices,
    questionText: state.vote.questionText,
    error: state.vote.error,
    isLoading: state.vote.isLoading,
  }));

  return (
    <div className="FormPage">
      <VoteForm
        questionText={questionText}
        choices={choices}
        isLoading={isLoading}
        error={error}
      />
      ;
    </div>
  );
}

export default VoteContainer;
