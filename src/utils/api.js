import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://ojs-news-app1.herokuapp.com/api",
});

export const getArticles = (sortBy, order, seeOnly) => {
  let ext = "/articles";
  let query = `sortby=${sortBy}`;
  let ord = `order=${order}`;
  let only = "";

  if (seeOnly.topic) {
    only = `topic=${seeOnly.topic}`;
  } else if (seeOnly.author) {
    only = `author=${seeOnly.author}`;
  }

  if (sortBy && order && seeOnly) {
    ext += `?${only}&&${query}&&${ord}`;
  } else if (sortBy && order) {
    ext += `?${query}&&${ord}`;
  } else if (sortBy && seeOnly) {
    ext += `?${only}&&${query}`;
  } else if (order && seeOnly) {
    ext += `?${only}&&${ord}`;
  } else if (sortBy) {
    ext += `?${query}`;
  } else if (order) {
    ext += `?${order}`;
  } else if (only) {
    ext += `?${only}`;
  }

  return newsApi.get(ext).then(({ data }) => {
    return data;
  });
};
