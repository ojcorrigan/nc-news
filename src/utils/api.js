import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://ojs-news-app1.herokuapp.com/api",
});

export const getArticles = (sortBy, order) => {
  let ext = "/articles";
  let query = "";
  if (sortBy) {
    query = `?sortby=${sortBy}`;
    ext += query;
    console.log("here");
  }
  console.log(ext);
  return newsApi.get(ext).then(({ data }) => {
    return data;
  });
};
