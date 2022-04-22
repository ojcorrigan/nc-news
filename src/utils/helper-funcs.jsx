export const sortFunc = (articlesArr, order) => {
  function compare(a, b) {
    const voteA = a.votes;
    const voteB = b.votes;
    let comparison = 0;
    if (order === "ASC") {
      if (voteA > voteB) {
        comparison = 1;
      } else if (voteA < voteB) {
        comparison = -1;
      }
    } else if (!order || order === "DESC") {
      if (voteA > voteB) {
        comparison = -1;
      } else if (voteA < voteB) {
        comparison = 1;
      }
    }
    return comparison;
  }
  return articlesArr.sort(compare);
};

export const commentsSort = (data) => {
  function compare(a, b) {
    const timeA = a.created_at;
    const timeB = b.created_at;
    let comparison = 0;
    if (timeA > timeB) {
      comparison = -1;
    } else if (timeA < timeB) {
      comparison = 1;
    }
    return comparison;
  }
  return data.comments.sort(compare);
};

export default { sortFunc, commentsSort };
