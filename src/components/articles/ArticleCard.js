import React from "react";
import { useHistory } from "react-router-dom";
import "./Article.css";

export const ArticleCard = ({ article, user, handleDeleteArticle }) => {
  const history = useHistory();
  const dateString = new Date(article.timestamp);
  const formattedDate = dateString.toDateString();
  return (
    <section className="article">
      <h3 className="articles">
        <a href={article.url}>{article.title}</a>
      </h3>
      <div className="article__synopsis">{article.synopsis}</div>
      <div>
        Posted by: {user?.name} on {formattedDate}
      </div>
      <button onClick={() => history.push(`/articles/${article.id}/edit`)}>
        {" "}
        Edit Article{" "}
      </button>
      <button onClick={() => handleDeleteArticle(article.id)}>
        Delete Article
      </button>
    </section>
  );
};
