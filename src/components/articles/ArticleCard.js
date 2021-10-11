import React from "react";
import { useHistory } from "react-router-dom";
import "./Article.css";

export const ArticleCard = ({ article, user, handleDeleteArticle }) => {
  const activeUserId = sessionStorage.getItem("nutshell_user");
  const history = useHistory();
  const dateString = new Date(article.timestamp);
  const formattedDate = dateString.toDateString();
  if (activeUserId == article.userId) {
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
  } else {
    return (
      <section className="article">
        <h3 className="articles">
          <a href={article.url}>{article.title}</a>
        </h3>
        <div className="article__synopsis">{article.synopsis}</div>
        <div>
          Posted by: {user?.name} on {formattedDate}
        </div>
      </section>
    );
  }
};
