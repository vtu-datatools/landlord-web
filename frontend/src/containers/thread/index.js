import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createPost,
  fetchThread,
  deletePost,
  deleteThread,
} from "../../redux/actions";
import Thread from "../../components/thread";

const ThreadContainer = () => {
  const dispatch = useDispatch();
  const { thread } = useParams();

  useEffect(() => {
    dispatch(fetchThread(thread));
  }, [dispatch]);

  const { thread: threadID } = useParams();

  const {
    isLoading,
    name,
    content,
    pinned,
    creator,
    createdAt,
    posts,
    error,
    isAuthenticated,
    newPostLoading,
    newPostError,
    newPostSuccess,
    authenticatedUsername,
    authenticatedIsStaff,
    deletePostList,
    isDeleting,
    deleteError,
  } = useSelector((state) => ({
    isLoading: state.thread.isLoading,
    name: state.thread.name,
    content: state.thread.content,
    pinned: state.thread.pinned,
    creator: state.thread.creator,
    createdAt: state.thread.createdAt,
    posts: state.thread.posts,
    error: state.thread.error,
    isAuthenticated: state.auth.isAuthenticated,
    authenticatedUsername: state.auth.username,
    authenticatedIsStaff: state.auth.isStaff,
    newPostSuccess: state.thread.newPostSuccess,
    newPostLoading: state.thread.newPostLoading,
    newPostError: state.thread.newPostError,
    deletePostList: state.thread.deletePostList,
    isDeleting: state.thread.isDeleting,
    deleteError: state.thread.deleteError,
  }));

  return (
    <Thread
      id={threadID}
      isLoading={isLoading}
      name={name}
      content={content}
      pinned={pinned}
      creator={creator}
      createdAt={createdAt}
      posts={posts}
      error={error}
      isAuthenticated={isAuthenticated}
      createPost={createPost}
      newPostSuccess={newPostSuccess}
      newPostLoading={newPostLoading}
      newPostError={newPostError}
      authenticatedUsername={authenticatedUsername}
      authenticatedIsStaff={authenticatedIsStaff}
      deletePostList={deletePostList}
      deletePost={deletePost}
      isDeleting={isDeleting}
      deleteError={deleteError}
      deleteThread={deleteThread}
    />
  );
};

export default ThreadContainer;
