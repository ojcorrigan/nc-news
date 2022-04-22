import { useState } from "react";
import { incVote } from "../utils/api";

const ArticleVotes = ({ votes, article_id }) => {
  const [voted, setVoted] = useState(false);
  const [votesState, setVoteState] = useState(0);
  return (
    <div>
      <p>Votes: {votesState + votes} </p>
      <button
        disabled={voted}
        onClick={() => {
          incVote(1, article_id);
          setVoteState(1);
          setVoted(true);
        }}
      >
        Up vote
      </button>
      <button
        disabled={voted}
        onClick={() => {
          incVote(-1, article_id);
          setVoteState(-1);
          setVoted(true);
        }}
      >
        Down Vote
      </button>
    </div>
  );
};

export default ArticleVotes;
