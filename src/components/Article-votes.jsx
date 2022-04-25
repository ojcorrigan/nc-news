import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { incVote } from "../utils/api";

const ArticleVotes = ({ votes, article_id, user }) => {
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [votesState, setVoteState] = useState(0);
  return (
    <div>
      <p>Votes: {votesState + votes} </p>
      <button
        disabled={upVote || !user.username}
        onClick={() => {
          let inc = 1;
          if (downVote) {
            inc += 1;
            setDownVote(false);
          }
          incVote(inc, article_id);
          setVoteState(1);
          setUpVote(true);
        }}
      >
        Up vote
      </button>
      <button
        disabled={downVote || !user.username}
        onClick={() => {
          let inc = -1;
          if (upVote) {
            inc -= 1;
            setUpVote(false);
          }
          incVote(inc, article_id);
          setVoteState(-1);
          setDownVote(true);
        }}
      >
        Down Vote
      </button>
    </div>
  );
};

export default ArticleVotes;
