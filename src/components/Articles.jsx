import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const [sortBy, setSortBy] = useState(undefined);

  const [order, setOrder] = useState(undefined);

  const [seeOnly, setSeeOnly] = useState("");

  const { topic } = useParams();

  useEffect(() => {
    console.log(topic);
    getArticles(sortBy, order, seeOnly).then((data) => {
      setArticles(data.articles);
    });
  }, [sortBy, order, seeOnly]);

  console.log(articles);
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
          }}
        >
          Author
        </button>
        <button
          className="articleSort"
          onClick={() => {
            setSortBy("topic");
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
                state={{}}
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
