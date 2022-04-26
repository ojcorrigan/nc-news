import { useEffect } from "react";
import { deleteComment } from "../utils/api";
import { getComments } from "../utils/api";
import { commentsSort } from "../utils/helper-funcs";

const ArticleComments = ({
  open,
  setComments,
  comments,
  setErr,
  err,
  username,
  article_id,
  setCommentCount,
}) => {
  let loggedIn = false;

  useEffect(() => {
    getComments(article_id)
      .then((data) => {
        loggedIn = false;
        let sorted = commentsSort(data);
        setComments(sorted);
      })
      .catch((error) => {
        setErr(error.response);
      });
  }, []);
  if (err) {
    return (
      <main>
        <p className="commentErr" id="commErr">
          {err}
        </p>
      </main>
    );
  } else if (open) {
    return (
      <ul>
        {comments.map((comment) => {
          return (
            <li className="commentList" key={comment.comment_id}>
              <p id="commentAuth">Comment by: {comment.author}</p>
              <p id="commentBody">{comment.body}</p>
              <p id="commentVotes">Votes: {comment.votes}</p>
              <p id="commentDate">{comment.created_at}</p>
              {comment.author === username && comment.comment_id !== "TBC" && (
                <button
                  onClick={() => {
                    setCommentCount((currentCount) => {
                      return (currentCount -= 1);
                    });
                    deleteComment(comment.comment_id);
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
