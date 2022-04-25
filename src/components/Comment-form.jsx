import { useState } from "react";

const CommentForm = ({
  comment,
  setComments,
  article_id,
  postComment,
  username,
  setCommentCount,
  err,
  setErr,
}) => {
  const [newComment, setNewComment] = useState("");
  if (comment) {
    return (
      <section>
        {err && <p className="errorMsg">Error posting comment</p>}
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
                setErr(err);
              });
          }}
        >
          <label>Comment: </label>
          <textarea
            id="commentField"
            required
            placeholder="Please comment here"
            value={newComment}
            onChange={(e) => {
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
