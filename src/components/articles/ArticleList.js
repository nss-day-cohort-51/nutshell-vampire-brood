import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import APIManager from "../../modules/APIManager";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const activeUserId = sessionStorage.getItem("nutshell_user");
  const apiManager = new APIManager();

  const getArticles = () => {
    return apiManager.getAll("articles", ["user"]).then((apiArticles) => {
      setArticles(apiArticles);
    });
  };

  const getUserArticles = (userId) => {
    return apiManager
      .getAllByUserId("articles", userId, ["user"])
      .then((userArticle) => {
        setArticles(userArticle);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    apiManager.getAll("users").then((user) => {
      setUsers(user);
    });
  }, []);

  const handleDeleteArticle = (id) => {
    return apiManager
      .delete("articles", id)
      .then(() => apiManager.getAll("articles").then(setArticles));
  };
  return (
    <>
      <section className="section-content">
        <button
          type="button"
          className="btn"
          onClick={() => {
            history.push("/articles/create");
          }}
        >
          Post Article
        </button>
      </section>
      <div className="container-cards">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            handleDeleteArticle={handleDeleteArticle}
            user={article.user}
          />
        ))}
      </div>
    </>
  );
};
