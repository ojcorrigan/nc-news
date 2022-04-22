import { useState } from "react";

const CommentForm = ({
  comment,
  setComments,
  article_id,
  postComment,
  username,
  setCommentCount,
}) => {
  const [newComment, setNewComment] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [posted, setPosted] = useState(null);
  if (comment) {
    return (
      <section>
        {posted && <p className="errorMsg">Error posting comment</p>}
        <form
          className="commentForm"
          onSubmit={(e) => {
            e.preventDefault();
            postComment(newComment, username, article_id)
              .then((data) => {
                setNewComment("");
                setComments((currComments) => {
                  return [data.comment, ...currComments];
                });
                setCommentCount((currentComms) => {
                  return currentComms + 1;
                });
              })
              .catch((err) => {
                setPosted(err);
              });
          }}
        >
          <label>Comment: </label>
          <textarea
            id="commentField"
            required
            placeholder="Please comment here"
            className={isValid ? "" : "invalid"}
            value={newComment}
            onChange={(e) => {
              setIsValid(true);
              setNewComment(e.target.value);
            }}
          >
            Please enter comment here...
          </textarea>
          <button>Submit</button>
        </form>
      </section>
    );
  }
};

export default CommentForm;
