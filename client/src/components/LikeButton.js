import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Button, Icon, Label } from "semantic-ui-react";

const LikeButton = ({ post: { likeCount, id, likes }, user }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button sty color="violet" onClick={likePost}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="violet" basic onClick={likePost}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="violet" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <>
      <Button as="div" labelPosition="right">
        {likeButton}
        <Label basic color="violet" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
