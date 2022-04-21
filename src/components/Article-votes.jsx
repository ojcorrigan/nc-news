import { React, useEffect, useState } from "react";
import { incVote } from "../utils/api";

const ArticleVotes = ({ votes, article_id }) => {
  const [voted, SetVoted] = useState(false);
  const [votesState, SetVoteState] = useState(0);
  return (
    <div>
      <p>Votes: {!voted ? votes : votesState} </p>
      <button
        onClick={() => {
          if (!voted) {
            incVote(1, article_id);
            SetVoteState(() => {
              return (votes += 1);
            });
            SetVoted(true);
          }
        }}
      >
        Up vote
      </button>
      <button
        onClick={() => {
          if (!voted) {
            incVote(-1, article_id);
            SetVoteState(() => {
              return (votes -= 1);
            });
            SetVoted(true);
          }
        }}
      >
        Down Vote
      </button>
    </div>
  );
};

export default ArticleVotes;
