import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";
import sortFunc from "../utils/helper-funcs";
import { useSearchParams } from "react-router-dom";
import RouteMissing from "./Route-missing";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const [seeOnly, setSeeOnly] = useState("");
  const [byVotes, setByVotes] = useState(false);
  const [err, setErr] = useState(null);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    let topic = searchParams.get("topic");
    if (topic) setSeeOnly(topic);
    getArticles(sortBy, order, seeOnly)
      .then((data) => {
        if (byVotes) {
          sortFunc(data.articles);
          setArticles(data.articles);
        } else setArticles(data.articles);
      })
      .catch((error) => {
        setErr(error);
      });
  }, [sortBy, order, seeOnly, byVotes]);
  if (err) {
    console.log(err);
    return <RouteMissing />;
  }
  return (
    <section>
      <form
        className="filter"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>Order: </label>
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
        <label>Sort By:</label>
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
                    setSeeOnly(article.topic);
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
