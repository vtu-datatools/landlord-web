import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOptions } from "../../redux/actions";

import VoteForm from "../../components/voteform";

function FormContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  const { isLoading, voteOptions, error } = useSelector((state) => ({
    error: state.vote.error,
    isLoading: state.vote.isLoading,
    voteOptions: state.vote.voteOptions,
  }));

  return (
    <div className="FormPage">
      <VoteForm options={voteOptions} isLoading={isLoading} error={error} />;
    </div>
  );
}

export default FormContainer;
