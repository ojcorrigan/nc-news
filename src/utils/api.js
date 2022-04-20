import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://ojs-news-app1.herokuapp.com/api",
});

export const getArticles = (sortby, order, seeOnly) => {
  let ext = "/articles";

  return newsApi
    .get(ext, {
      params: {
        sortby,
        order,
        topic: seeOnly.topic,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

export const getSingleArticle = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};
