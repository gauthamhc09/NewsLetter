import { useContext, useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

import { NotificationContext } from '../../store/notification-context';
import CommentList from './comment-list';
import classes from './comments.module.css';
import NewComment from './new-comment';

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

  const notificationCtx = useContext(NotificationContext);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    // debugger;
    notificationCtx.showNotification({
      title: 'Posting...',
      message: 'Adding your comments.',
      status: 'pending',
    });
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        console.log(data);
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully posted the comment!',
          status: 'success',
        });
      }
      )
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
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
        {showComments && <NewComment onAddComment={addCommentHandler} />}
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
