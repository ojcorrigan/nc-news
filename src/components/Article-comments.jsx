import { React, useEffect } from "react";
import { deleteComment } from "../utils/api";
import { getComments } from "../utils/api";

const ArticleComments = ({
  open,
  setComments,
  comments,
  commentChange,
  setErr,
  err,
  setCommentChange,
  username,
  article_id,
}) => {
  useEffect(() => {
    setCommentChange(false);
    getComments(article_id)
      .then((data) => {
        function compare(a, b) {
          const timeA = a.created_at;
          const timeB = b.created_at;
          let comparison = 0;
          if (timeA > timeB) {
            comparison = -1;
          } else if (timeA < timeB) {
            comparison = 1;
          }
          return comparison;
        }
        data.comments.sort(compare);
        setComments(data.comments);
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  }, [commentChange]);
  if (err) {
    return (
      <main>
        <p className="commentErr" id="commErr">
          {err}
        </p>
      </main>
    );
  }

  if (open) {
    return (
      <ul>
        {comments.map((comment) => {
          return (
            <li className="commentList" key={comment.comment_id}>
              <p id="commentAuth">Comment by: {comment.author}</p>
              <p id="commentBody">{comment.body}</p>
              <p id="commentVotes">Votes: {comment.votes}</p>
              <p id="commentDate">{comment.created_at}</p>
              {comment.author === username && (
                <button
                  onClick={() => {
                    deleteComment(comment.comment_id);
                    setCommentChange(true);
                    setComments((currentComms) => {
                      return currentComms.filter((comm) => {
                        if (comm.comment_id !== comment.comment_id) return comm;
                      });
                    });
                  }}
                >
                  delete comment
                </button>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
};

export default ArticleComments;
