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
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const getComments = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const postComment = (comment, username, article_id) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, {
      username,
      body: comment,
    })
    .then(({ data }) => {
      return data;
    });
};

export const deleteComment = (comment_id) => {
  return newsApi.delete(`comments/${comment_id}`).then((response) => {
    console.log(response);
  });
};
