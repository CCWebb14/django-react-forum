import React from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

import ChatTab from "./ChatTab";
import Bubble from "./Bubble";
import Button from "./Button";
import CommentBubble from "./CommentBubble";
import Spinner from "./Spinner";

import { usePostFetch } from "../hooks/usePostFetch";
import { useComment } from "../hooks/useComment";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import MUIButton from "@mui/material/Button";

const Post = () => {
  const { postId } = useParams();

  const { state, loading, error, setIsLoadingMore } = usePostFetch(postId);
  const {
    commentLoading,
    commentError,
    isCommenting,
    setIsCommenting,
    setBody,
    setParentID,
  } = useComment(postId);

  const [drawerState, setDrawerState] = React.useState({
    open: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ [anchor]: open });
  };

  const list = () => (
    <Box
      sx={{
        width: "auto",
        backgroundColor: "#1F2937",
        padding: "25px",
        rowGap: "10px",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <TextField
        sx={{ backgroundColor: "#ffffff" }}
        // onChange={(e) => console.log(e.target.value)}
        onChange={(e) => setBody(e.target.value)}
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={4}
      />
      <p></p>
      <MUIButton
        variant="contained"
        onClick={() => setIsCommenting(true)}
        // onClick={() => console.log('hello')}
        endIcon={<SendIcon />}
      >
        Send
      </MUIButton>
    </Box>
  );

  console.log(state);

  if (error) return <div>Failed to retrieve posts...</div>;

  const renderComments = (comments, depth) =>
    comments?.map((comment) => {
      const recComments = renderComments(comment.replies, depth + 1);

      return (
        <>
          <CommentBubble
            key={comment.id}
            author={comment.username}
            body={comment.body}
            id={comment.id}
            replies={comment.replies}
            depth={depth}
            clickable
            callback={() => {
              // setIsCommenting(true);
              setParentID(comment.id);
              setDrawerState({ bottom: true });
            }}
          />
          {recComments}
        </>
      );
    });

  return (
    <>
      <ChatTab header={"Post"}>
        <Bubble
          key={state.id}
          title={state.title}
          author={state.username}
          body={state.body}
          postID={state.id}
          comment_amt={state.comment_amt}
          callback={() => {
            // setIsCommenting(true);
            setParentID(null);
            setDrawerState({ bottom: true });
          }}
        />
        {state.comments?.length ? (
          renderComments(state.comments, 0)
        ) : (
          <div>No Comments</div>
        )}
      </ChatTab>
      <Drawer
        anchor={"bottom"}
        open={drawerState["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        {list("bottom")}
      </Drawer>
    </>
  );
};

export default Post;
