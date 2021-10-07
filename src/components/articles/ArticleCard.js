import React from "react";
import "./Article.css";

export const ArticleCard = ({ article, user, handleDeleteArticle }) => {
  return (
    <section className="article">
      <h3 className="articles">
        <a href={article.url}>{article.title}</a>
      </h3>
      <div className="article__synopsis">{article.synopsis}</div>
      <div>
        Posted by: {user?.name} on {article.timestamp}
      </div>
      <button onClick={() => handleDeleteArticle(article.id)}>
        Delete Article
      </button>
    </section>
  );
};
