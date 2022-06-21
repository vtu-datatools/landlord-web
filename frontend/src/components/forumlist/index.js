import React from "react";
import { Header, Segment, Grid } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import ForumCardList from "./forumcardlist";
import StatusMessage from "../statusmessage";
import "./styles.css";

const ForumList = (props) => {
  const { isLoading, error, forums } = props;
  const isBigScreen = useMediaQuery({ query: "(min-width: 900px)" });

  if (error || !forums || isLoading || forums.length === 0) {
    return (
      <StatusMessage
        error={error || !forums}
        errorClassName="home-error"
        errorMessage={error}
        loading={isLoading}
        loadingMessage={"We are fetching the homepage for you"}
        nothing={forums && forums.length === 0}
        nothingMessage={"No forum to display"}
        nothingClassName="home-error"
        type="default"
      />
    );
  }
  if (isBigScreen) {
    return (
      <div className="homeContainer">
        <div className="homeHeaders">
          <Grid columns={3} padded="horizontally">
            <Grid.Column width={10}>
              <Header size="large" color="grey">
                Forum
              </Header>
            </Grid.Column>
            <Grid.Column width={1}>
              <Header size="large" color="grey">
                Posts
              </Header>
            </Grid.Column>
            <Grid.Column width={3} floated="right">
              <Header size="large" color="grey">
                Most recent
              </Header>
            </Grid.Column>
          </Grid>
        </div>
        <Segment.Group className="home-list">
          <ForumCardList forums={forums} isBigScreen={isBigScreen} />
        </Segment.Group>
      </div>
    );
  } else {
    return (
      <div className="homeContainer">
        <div className="homeHeaders">
          <Grid columns={2} padded="horizontally">
            <Grid.Column width={9}>
              <Header size="large" color="grey">
                Forum
              </Header>
            </Grid.Column>
            <Grid.Column width={4} floated="right">
              <Header size="large" color="grey" className="posts">
                Posts
              </Header>
            </Grid.Column>
          </Grid>
        </div>
        <Segment.Group className="home-list">
          <ForumCardList forums={forums} isBigScreen={isBigScreen} />
        </Segment.Group>
      </div>
    );
  }
};

export default ForumList;
