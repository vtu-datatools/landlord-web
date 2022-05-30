import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createThreadSave,
  createThreadToggle,
  fetchForum,
  createThread,
} from "../../redux/actions";
import ThreadList from "../../components/threadlist";
import NewThread from "../../components/newthread";

const ForumContainer = () => {
  const dispatch = useDispatch();
  const { forum } = useParams();

  const {
    name,
    slug,
    description,
    threads,
    error,
    isLoading,
    isAuthenticated,
    newThreadLoading,
    newThreadSuccess,
    newThreadName,
    newThreadContent,
    newThreadId,
    newThreadError,
    newThreadShow,
  } = useSelector((state) => ({
    name: state.forum.name,
    slug: state.forum.slug,
    description: state.forum.description,
    threads: state.forum.threads,
    error: state.forum.error,
    isLoading: state.forum.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    newThreadLoading: state.forum.newThreadLoading,
    newThreadSuccess: state.forum.newThreadSuccess,
    newThreadName: state.forum.newThreadName,
    newThreadContent: state.forum.newThreadContent,
    newThreadId: state.forum.newThreadId,
    newThreadError: state.forum.newThreadError,
    newThreadShow: state.forum.newThreadShow,
  }));

  useEffect(() => {
    dispatch(fetchForum(forum));
  }, [dispatch]);
  return (
    <div>
      <ThreadList
        isLoading={isLoading}
        name={name}
        slug={slug}
        description={description}
        threads={threads}
        error={error}
      />
      <NewThread
        forum={slug}
        isAuthenticated={isAuthenticated}
        isLoading={newThreadLoading}
        success={newThreadSuccess}
        name={newThreadName}
        content={newThreadContent}
        id={newThreadId}
        error={newThreadError}
        showEditor={newThreadShow}
        createThread={createThread}
        updateNewThread={createThreadSave}
        toggleShowEditor={createThreadToggle}
        maxLength={2000}
      />
    </div>
  );
};

export default ForumContainer;
