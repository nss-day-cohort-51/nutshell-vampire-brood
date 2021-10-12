import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import { useParams, useHistory } from "react-router-dom";

export const ArticleEditForm = () => {
<<<<<<< HEAD
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));
    const [article, setArticle] = useState({
        url: "",
        title: "",
        synopsis: "",
    });
    const { articleId } = useParams();
    debugger;
    const apiManager = new APIManager();
    const history = useHistory();

    const handleFieldChange = (e) => {
        const stateToChange = { ...article };
        stateToChange[e.target.id] = e.target.value;
        setArticle(stateToChange);
    };

    const updateExistingArticle = (e) => {
        e.preventDefault();

        const editedArticle = {
            id: articleId,
            userId: currentUserId,
            url: article.url,
            title: article.title,
            synopsis: article.synopsis,
            timestamp: Date.now(),
        };
        if (
            editedArticle.userId === 0 ||
            editedArticle.url === "" ||
            editedArticle.title === "" ||
            editedArticle.synopsis === ""
        ) {
            window.alert("Please fill out form before submitting");
        } else {
            apiManager
                .updateEntry("articles", editedArticle)
                .then(() => history.push("/"));
        }
    };

    useEffect(() => {
        apiManager.getById("articles", articleId).then((article) => {
            setArticle(article);
        });
    }, []);

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
                        onChange={handleFieldChange}
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
                        onChange={handleFieldChange}
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
                        onChange={handleFieldChange}
                    />
                </div>
            </fieldset>

            <button className="btn btn-primary" onClick={updateExistingArticle}>
                Save Article
            </button>
        </form>
    );
=======
  const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));
  const [article, setArticle] = useState({
    url: "",
    title: "",
    synopsis: "",
  });
  const { articleId } = useParams();
  const apiManager = new APIManager();
  const history = useHistory();

  const handleFieldChange = (e) => {
    const stateToChange = { ...article };
    stateToChange[e.target.id] = e.target.value;
    setArticle(stateToChange);
  };

  const updateExistingArticle = (e) => {
    e.preventDefault();

    const editedArticle = {
      id: articleId,
      userId: currentUserId,
      url: article.url,
      title: article.title,
      synopsis: article.synopsis,
      timestamp: Date.now(),
    };
    if (
      editedArticle.userId === 0 ||
      editedArticle.url === "" ||
      editedArticle.title === "" ||
      editedArticle.synopsis === ""
    ) {
      window.alert("Please fill out form before submitting");
    } else {
      apiManager
        .updateEntry("articles", editedArticle)
        .then(() => history.push("/"));
    }
  };

  useEffect(() => {
    apiManager.getById("articles", articleId).then((article) => {
      setArticle(article);
    });
  }, []);

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
            onChange={handleFieldChange}
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
            onChange={handleFieldChange}
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
            onChange={handleFieldChange}
          />
        </div>
      </fieldset>

      <button className="btn btn-primary" onClick={updateExistingArticle}>
        Save Article
      </button>
    </form>
  );
>>>>>>> main
};
