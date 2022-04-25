import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import sortFunc from "../utils/newSort";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import RouteMissing from "./Route-missing";
import Loading from "./Loading";

const Articles = ({ err, setErr }) => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState(undefined);
  const [order, setOrder] = useState(undefined);
  const [seeOnly, setSeeOnly] = useState("");
  const [byVotes, setByVotes] = useState(false);
  const [searchParams] = useSearchParams();

  let location = useLocation();
  let topicQ = searchParams.get("topic");
  let topic = "";

  useEffect(() => {
    if (topicQ) {
      topic = topicQ;
    } else topic = seeOnly;

    getArticles(topic, sortBy, order)
      .then((data) => {
        topic = "";
        if (byVotes) {
          sortFunc(data.articles, order);
          setArticles(data.articles);
        } else {
          setArticles(data.articles);
        }
      })
      .catch((error) => {
        setErr(error);
      });
  }, [sortBy, order, seeOnly, byVotes, location]);
  if (err) {
    return <RouteMissing />;
  }
  if (articles.length === 0) {
    return <Loading />;
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
                <p className="articleTopic">{article.topic}</p>
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
