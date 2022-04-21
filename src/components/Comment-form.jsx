import { React, useState } from "react";

const CommentForm = ({
  comment,
  setComments,
  article_id,
  setCommentChange,
  postComment,
  username,
}) => {
  const [newComment, setNewComment] = useState("Enter comment here...");
  const [isValid, setIsValid] = useState(true);
  if (comment) {
    return (
      <form
        className="commentForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (newComment === "") {
            setIsValid(false);
            setNewComment("Please enter comment");
          } else if (newComment === "Enter comment here...") {
            setIsValid(false);
          } else if (newComment === "Please enter comment") {
            setIsValid(false);
          } else if (newComment !== "") {
            setComments((currComments) => {
              let comm = {
                votes: 0,
                author: username,
                body: newComment,
                created_at: Date.now(),
                comment_id: "TBC",
              };
              return [comm, ...currComments];
            });
            postComment(newComment, username, article_id);
            setCommentChange(true);
            setNewComment("");
          }
        }}
      >
        <label>Comment: </label>
        <textarea
          id="commentField"
          className={isValid ? "" : "invalid"}
          value={newComment}
          onClick={() => {
            if (newComment === "Enter comment here...") setNewComment("");
            if (newComment === "Please enter comment");
            setNewComment("");
          }}
          onChange={(e) => {
            setIsValid(true);
            setNewComment(e.target.value);
          }}
        >
          Please enter comment here...
        </textarea>
        <button>Submit</button>
      </form>
    );
  }
};

export default CommentForm;
