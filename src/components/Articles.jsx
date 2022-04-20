import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const [sortBy, setSortBy] = useState(undefined);

  const [order, setOrder] = useState(undefined);

  const [seeOnly, setSeeOnly] = useState("");

  useEffect(() => {
    getArticles(sortBy, order, seeOnly).then((data) => {
      setArticles(data.articles);
    });
  }, [sortBy, order, seeOnly]);

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
          Ascending
        </button>
        <button
          className="articleOrder"
          onClick={() => {
            setOrder("DESC");
          }}
        >
          Descending
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
              <h2 className="articleTitle">{article.title}</h2>
              <p
                className="articleTopic"
                onClick={() => {
                  setSeeOnly({ topic: article.topic });
                }}
              >
                {article.topic}
              </p>
              <p
                className="articleAuthor"
                onClick={() => {
                  setSeeOnly({ author: article.author });
                }}
              >
                {article.author}
              </p>
            </li>
          );
        })}
      </ul>
      <p>Hello</p>
    </section>
  );
};

export default Articles;
