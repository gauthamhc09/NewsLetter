import classes from './comment-list.module.css';

function CommentList({ comments }) {

  console.log('comments', comments);

  const commentList = comments || [];

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */
        commentList && commentList.length > 0 && commentList.map((comment) => {
          return (
            <li key={comment._id}>
              <p>{comment.text}</p>
              <div>
                By <address>{comment.name}</address>
              </div>
            </li>
          )
        })
      }
      {
        commentList.length < 0 && <li>No Comments Yet</li>
      }
    </ul>
  );
}

export default CommentList;
