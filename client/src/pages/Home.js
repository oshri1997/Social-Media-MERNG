import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid, Header } from "semantic-ui-react";
import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  return (
    <Grid columns={3} divided>
      <Grid.Row centered style={{ marginTop: 20 }}>
        <Header as="h1">Recent Posts</Header>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>loading posts...</h1>
        ) : (
          data &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        createdAt
        username
        body
      }
    }
  }
`;
export default Home;
