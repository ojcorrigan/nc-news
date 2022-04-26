import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle, postComment } from "../utils/api";
import CommentForm from "./Comment-form";
import ArticleComments from "./Article-comments";
import ArticleVotes from "./Article-votes";
import RouteMissing from "./Route-missing";

const SingleArticle = ({ user, err, setErr }) => {
  const [article, setArticle] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    getSingleArticle(article_id)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  }, []);
  if (err === "Article not found") {
    return <RouteMissing />;
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
          user={user}
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
        postComment={postComment}
        username={user.username}
        setCommentCount={setCommentCount}
        setErr={setErr}
      ></CommentForm>
      <ArticleComments
        open={isOpen}
        setComments={setComments}
        comments={comments}
        username={user.username}
        article_id={article_id}
        setCommentCount={setCommentCount}
        setErr={setErr}
      ></ArticleComments>
    </div>
  );
};
export default SingleArticle;
