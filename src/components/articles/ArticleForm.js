import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";

export const ArticleForm = () => {
  const [article, setArticle] = useState({
    userId: 0,
    url: "",
    title: "",
    synopsis: "",
    timestamp: 0,
  });

  const [users, setUsers] = useState([]);

  const handleControlledInputChange = (event) => {
    const newArticle = { ...article };
    const apiManager = new APIManager();
    let selectedValue = event.target.value;

    if (event.target.id.includes("Id")) {
      selectedValue = parseInt(selectedValue);
    }

    newArticle[event.target.id] = selectedValue;
    setArticle(newArticle);

    useEffect(() => {
      apiManager.getAll("users").then((user) => {
        setUsers(user);
      });
    });
  };

  const handleClickSaveArticle = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

    //Invoke addArticle passing the new article object as an argument
    //Once complete, change the url and display the article list

    const newArticle = {
      userId: currentUserId,
      url: article.url,
      title: article.title,
      synopsis: article.synopsis,
      timestamp: Date.now(),
    };
    apiManager.addEntry(articles, newArticle);
  };

  return (
    <form className="articleForm">
      <h2 className="articleForm__title">New Article</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Article title:</label>
          <input
            type="text"
            id="title"
            required
            autoFocus
            className="form-control"
            placeholder="Article title"
            value={article.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="synopsis">Article synopsis:</label>
          <input
            type="text"
            id="synopsis"
            required
            autoFocus
            className="form-control"
            placeholder="Article synopsis"
            value={article.synopsis}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="url">Article url:</label>
          <input
            type="text"
            id="url"
            required
            autoFocus
            className="form-control"
            placeholder="Article url"
            value={article.url}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <button className="btn btn-primary" onClick={handleClickSaveArticle}>
        Save Article
      </button>
    </form>
  );
};
