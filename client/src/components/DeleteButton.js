import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../graphql";

const DeleteButton = ({ postId, callback, commentId }) => {
  const [confirmOpen, setConfrimOpen] = useState(false);
  const dynamicMutation = commentId ? DELETE_COMMENT : DELETE_POST;
  const [deletePostOrComment] = useMutation(dynamicMutation, {
    variables: {
      postId,
      commentId,
    },
    update(proxy) {
      setConfrimOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        let copyData = data.getPosts;
        copyData = data.getPosts.filter((post) => postId !== post.id);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: [...copyData],
          },
        });
      }
      if (callback) callback();
    },
  });
  return (
    <>
      <Popup
        content={commentId ? "Delete comment" : "Delete Post"}
        inverted
        trigger={
          <Button
            as="div"
            color="red"
            onClick={() => setConfrimOpen(true)}
            floated="right"
          >
            <Icon style={{ margin: 0 }} name="trash" />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfrimOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};
const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
