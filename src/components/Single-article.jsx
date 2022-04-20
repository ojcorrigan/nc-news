import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, postComment } from "../utils/api";
import { getComments } from "../utils/api";

const username = "cooljmessy";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [err, setErr] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentPosted, setNewCommentPosted] = useState([false]);
  const { article_id } = useParams();

  useEffect(() => {
    getSingleArticle(article_id)
      .then((data) => {
        setArticle(data);
        setNewCommentPosted(false);
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  }, [newCommentPosted]);
  console.log(newCommentPosted);
  if (err) {
    return (
      <main>
        <h2 id="articleHead">{article.title}</h2>
        <p className="articleP" id="Err">
          {err}
        </p>
      </main>
    );
  }

  return (
    <div>
      <main>
        <h2 id="articleHead">{article.title}</h2>
        <p className="articleP" id="topic">
          {article.topic}
        </p>
        <p className="articleP" id="singleAuthor">
          {article.author}
        </p>
        <p className="articleP" id="body">
          {article.body}
        </p>
        <p
          className="articleP"
          id="comment_count"
          onClick={() => {
            if (!isOpen) setIsOpen(true);
            else setIsOpen(false);
          }}
        >
          Comments: {article.comment_count}
        </p>
        <p className="articleP" id="votes">
          Votes: {article.votes}
        </p>
        <p className="articleP" id="date">
          {" "}
          {article.created_at}
        </p>
        <button
          onClick={() => {
            if (!addComment) setAddComment(true);
            else setAddComment(false);
          }}
        >
          Add Comment
        </button>
      </main>
      <CommentForm
        comment={addComment}
        setComments={setComments}
        article_id={article_id}
        setNewCommentPosted={setNewCommentPosted}
      ></CommentForm>
      <ArticleComments
        open={isOpen}
        setComments={setComments}
        comments={comments}
        setNewCommentPosted={setNewCommentPosted}
        newCommentPosted={newCommentPosted}
      ></ArticleComments>
    </div>
  );
};

const ArticleComments = ({
  open,
  setComments,
  comments,
  newCommentPosted,
  setNewCommentPosted,
}) => {
  // const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getComments(article_id).then((data) => {
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
    });
  }, [newCommentPosted]);

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
            </li>
          );
        })}
      </ul>
    );
  }
};

const CommentForm = ({
  comment,
  setComments,
  article_id,
  setNewCommentPosted,
}) => {
  const [newComment, setNewComment] = useState("");
  if (comment) {
    console.log(newComment);
    return (
      <form
        className="commentForm"
        onSubmit={(e) => {
          e.preventDefault();
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
          setNewCommentPosted(true);
        }}
      >
        <label>Comment: </label>
        <textarea
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        ></textarea>
        <button>Submit</button>
      </form>
    );
  }
};

export default SingleArticle;
