import { useEffect, useRef, useState, CSSProperties } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    // debugger;
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data),
          emailInputRef.current.value = ""
        nameInputRef.current.value = ""
        commentInputRef.current.value = ""
      }
      );
  }
  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(response => response.json())
        .then(data => {
          console.log('data', data);
          setComments(data.comments);
          setLoading(false);
        })
    }

  }, [showComments])
  return (
    <>
      <section className={classes.comments}>
        <button onClick={toggleCommentsHandler}>
          {showComments ? 'Hide' : 'Show'} Comments
        </button>
        {showComments && <NewComment onAddComment={addCommentHandler} emailInputRef={emailInputRef} nameInputRef={nameInputRef} commentInputRef={commentInputRef} />}
        {showComments && loading && <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={120}
          aria-label="Loading Spinner"
          data-testid="loader"
        />}
        {showComments && !loading && <CommentList comments={comments} />}
      </section>
    </>

  );
}

export default Comments;
