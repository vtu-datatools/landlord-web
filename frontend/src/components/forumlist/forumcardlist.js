import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Grid, Icon } from "semantic-ui-react";

import Avatar from "../avatar";
import "./styles.css";

const ForumCardList = (props) => {
  const { forums, isBigScreen } = props;

  return forums.map((forum) => {
    const {
      name,
      slug,
      description,
      posts_count,
      threads_count,
      last_activity,
    } = forum;
    const total_posts = posts_count + threads_count;
    let lastActivity = (
      <div className="home-text home-vertical">{"—  No activity —"}</div>
    );

    if (last_activity) {
      let { thread_id, thread_name, username, avatar, pinned, naturaltime } =
        last_activity;

      thread_name =
        thread_name.length > 20
          ? thread_name.substring(0, 20) + "..."
          : thread_name;
      lastActivity = (
        <div className="home-row">
          <Avatar
            className="home-avatar"
            avatar={avatar}
            centered={false}
            link={`/user/${username}`}
          />
          <div className="home-column">
            <div>
              {pinned && <Icon name="pin" />}
              <Link to={`/thread/${thread_id}`}>{thread_name}</Link>
            </div>
            <div className="home-meta">
              <Link to={`/user/${username}`}>
                <Icon name="user" />
                By {username}
              </Link>
              <b>{`  —  ${naturaltime}`}</b>
            </div>
          </div>
        </div>
      );
    }
    if (isBigScreen) {
      return (
        <Segment vertical key={slug}>
          <Grid textAlign="left" padded="horizontally">
            <Grid.Column width={10}>
              <Grid.Row>
                <Link to={`/forum/${slug}`} className="forumTitle">
                  {name}
                </Link>
              </Grid.Row>
              <Grid.Row>{description}</Grid.Row>
            </Grid.Column>
            <Grid.Column width={1}>
              <div className="home-column home-stats home-vertical">
                <Header>{total_posts}</Header>
              </div>
            </Grid.Column>
            <Grid.Column width={3} floated="right">
              {lastActivity}
            </Grid.Column>
          </Grid>
        </Segment>
      );
    } else {
      return (
        <Segment vertical key={slug}>
          <Grid textAlign="left" padded="horizontally">
            <Grid.Column width={10}>
              <Grid.Row>
                <Link to={`/forum/${slug}`} className="forumTitle">
                  {name}
                </Link>
              </Grid.Row>
              <Grid.Row>{description}</Grid.Row>
            </Grid.Column>
            <Grid.Column width={3} floated="right">
              <div className="home-column home-stats-mobile home-vertical">
                <Header>{total_posts}</Header>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    }
  });
};
export default ForumCardList;
