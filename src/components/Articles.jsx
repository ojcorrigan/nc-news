import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [buttonPress, setButtonPress] = useState(null);
  let arts = getArticles();
  useEffect(() => {
    arts.then((articlesFromApi) => {
      setArticles(articlesFromApi.articles);
      setButtonPress(null);
    });
  }, [buttonPress]);

  return (
    <section>
      <form
        className="filter"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>Sort: </label>
        <button className="articleSort">Ascending</button>
        <button className="articleSort">Descending</button>
        <button
          className="articleSort"
          onClick={() => {
            arts = getArticles("title");
            setButtonPress(true);
          }}
        >
          title
        </button>
        <button className="articleSort">Author</button>
        <button className="articleSort">topic</button>
      </form>
      <ul className="articleList">
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <h2 className="articleTitle">{article.title}</h2>
              <p className="articleTopic">{article.topic}</p>
              <p className="articleAuthor">{article.author}</p>
            </li>
          );
        })}
      </ul>
      <p>Hello</p>
    </section>
  );
};

export default Articles;
