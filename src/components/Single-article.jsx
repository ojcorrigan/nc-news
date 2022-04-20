import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleArticle } from "../utils/api";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [err, setErr] = useState(null);
  const { article_id } = useParams();
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
  );
};

export default SingleArticle;
