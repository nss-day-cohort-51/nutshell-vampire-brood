import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import APIManager from "../../modules/APIManager";

export const ArticleForm = () => {
    const [article, setArticle] = useState({
        userId: 0,
        url: "",
        title: "",
        synopsis: "",
        timestamp: 0,
    });

    const apiManager = new APIManager();

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newArticle = { ...article };
        let selectedValue = event.target.value;

        newArticle[event.target.id] = selectedValue;
        setArticle(newArticle);
    };

    const handleClickSaveArticle = (event) => {
        event.preventDefault();

        const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"));

        const newArticle = {
            userId: currentUserId,
            url: article.url,
            title: article.title,
            synopsis: article.synopsis,
            timestamp: Date.now(),
        };

        if (
            newArticle.userId === 0 ||
            newArticle.url === "" ||
            newArticle.title === "" ||
            newArticle.synopsis === ""
        ) {
            window.alert("Please fill out form before submitting");
        } else {
            apiManager
                .addEntry("articles", newArticle)
                .then(() => history.push("/"));
        }
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

            <button
                className="btn btn-primary"
                onClick={handleClickSaveArticle}
            >
                Save Article
            </button>
        </form>
    );
};
