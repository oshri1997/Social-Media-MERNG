import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../graphql";

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfrimOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId,
    },
    update(proxy) {
      setConfrimOpen(false);
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
      if (callback) callback();
    },
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfrimOpen(true)}
        floated="right"
      >
        <Icon style={{ margin: 0 }} name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfrimOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};
const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
