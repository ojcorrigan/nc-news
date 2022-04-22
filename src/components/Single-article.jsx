import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, postComment } from "../utils/api";
import CommentForm from "./Comment-form";
import ArticleComments from "./Article-comments";
import ArticleVotes from "./Article-votes";
import RouteMissing from "./Route-missing";
const username = "cooljmessy";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [err, setErr] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentChange, setCommentChange] = useState(false);
  const { article_id } = useParams();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    setCommentChange(false);
    getSingleArticle(article_id)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  }, [commentChange]);
  if (err) {
    return <RouteMissing></RouteMissing>;
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
        <p className="articleP" id="comment_count">
          Comments: {Number(article.comment_count) + commentCount}
        </p>
        <ArticleVotes
          votes={article.votes}
          article_id={article.article_id}
        ></ArticleVotes>
        <p className="articleP" id="date">
          {" "}
          {article.created_at}
        </p>
        <button
          id="commentButt"
          onClick={() => {
            if (!addComment) setAddComment(true);
            else setAddComment(false);
            if (!isOpen) setIsOpen(true);
            else setIsOpen(false);
          }}
        >
          View Comments
        </button>
      </main>
      <CommentForm
        comment={addComment}
        setComments={setComments}
        article_id={article_id}
        setCommentChange={setCommentChange}
        postComment={postComment}
        username={username}
        setCommentCount={setCommentCount}
      ></CommentForm>
      <ArticleComments
        open={isOpen}
        setComments={setComments}
        comments={comments}
        setCommentChange={setCommentChange}
        // commentChange={commentChange}
        username={username}
        article_id={article_id}
        setCommentCount={setCommentCount}
      ></ArticleComments>
    </div>
  );
};
export default SingleArticle;
