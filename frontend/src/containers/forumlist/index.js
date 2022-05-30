import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchForums } from "../../redux/actions";
import ForumList from "../../components/forumlist";

const ForumListContainer = () => {
  const dispatch = useDispatch();

  const { isLoading, forums, error } = useSelector((state) => ({
    isLoading: state.forumlist.isLoading,
    forums: state.forumlist.forums,
    error: state.forumlist.error,
  }));

  useEffect(() => {
    dispatch(fetchForums());
  }, [dispatch]);
  return <ForumList isLoading={isLoading} forums={forums} error={error} />;
};

export default ForumListContainer;
