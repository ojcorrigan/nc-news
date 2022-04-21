import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../utils/api";
import { getComments } from "../utils/api";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [err, setErr] = useState(null);
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(article_id).then((data) => {
      setComments(data.comments);
    });
  }, []);

  useEffect(() => {
    getSingleArticle(article_id)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  }, [article_id]);

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
      </main>
      <ArticleComments open={isOpen}></ArticleComments>
    </div>
  );
};

const ArticleComments = ({ open }) => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getComments(article_id).then((data) => {
      setComments(data.comments);
    });
  }, []);

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

export default SingleArticle;
