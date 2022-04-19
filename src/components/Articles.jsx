import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi.articles);
    });
  }, []);

  return (
    <section>
      <div className="filter">
        <p>Sort: </p>
        <button className="articleSort">Ascending</button>
        <button className="articleSort">Descending</button>
        <button className="articleSort">title</button>
        <button className="articleSort">Author</button>
        <button className="articleSort">topic</button>
      </div>
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
