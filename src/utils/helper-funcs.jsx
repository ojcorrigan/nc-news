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

export default sortFunc;
