import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";
import sortFunc from "../utils/helper-funcs";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const [seeOnly, setSeeOnly] = useState("");
  const [byVotes, setByVotes] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getArticles(sortBy, order, seeOnly)
      .then((data) => {
        if (byVotes) {
          let sorted = sortFunc(data.articles, order);
          setArticles(sorted);
        } else {
          setArticles(data.articles);
        }
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  }, [sortBy, order, seeOnly, byVotes]);
  return (
    <section>
      <form
        className="filter"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>Sort: </label>
        <button
          className="articleOrder"
          onClick={() => {
            setOrder("ASC");
          }}
        >
          Asc
        </button>
        <button
          className="articleOrder"
          onClick={() => {
            setOrder("DESC");
          }}
        >
          Desc
        </button>
        <button
          className="articleSort"
          id="author"
          onClick={() => {
            setSortBy("author");
            setByVotes(false);
          }}
        >
          Author
        </button>
        <button
          className="articleSort"
          id="votes"
          onClick={() => {
            setByVotes(true);
          }}
        >
          Votes
        </button>
        <button
          className="articleSort"
          onClick={() => {
            setSortBy("topic");
            setByVotes(false);
          }}
        >
          topic
        </button>
        <button
          className="articleSort"
          onClick={() => {
            setSortBy(undefined);
          }}
        >
          Date
        </button>
        <button
          className="articleSort"
          onClick={() => {
            setSortBy(undefined);
            setOrder(undefined);
            setSeeOnly("");
            setByVotes(false);
          }}
        >
          Clear Filters
        </button>
      </form>
      <ul className="articleList">
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <Link
                to={`/articles/${article.article_id}`}
                className="articleTitle"
              >
                {article.title}
              </Link>
              <Link to={`/articles?topic=${article.topic}`}>
                <p
                  className="articleTopic"
                  onClick={() => {
                    setSeeOnly({ topic: article.topic });
                  }}
                >
                  {article.topic}
                </p>
              </Link>
              <p className="articleAuthor">{article.author}</p>
              <p>Votes: {article.votes}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Articles;
