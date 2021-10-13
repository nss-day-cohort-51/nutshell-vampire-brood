import React from "react";
import { RT } from "../tools/HelperFunctions";
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
                    <a href={article.url}>{RT(article.title)}</a>
                </h3>
                <div className="article__synopsis">{RT(article.synopsis)}</div>
                <div>
                    {RT("Posted by:")} {RT(user?.name)} on {RT(formattedDate)}
                </div>
                <button
                    onClick={() => history.push(`/articles/${article.id}/edit`)}
                >
                    {" "}
                    {RT("Edit Article")}{" "}
                </button>
                <button onClick={() => handleDeleteArticle(article.id)}>
                    {RT("Delete Article")}
                </button>
            </section>
        );
    } else {
        return (
            <section className="article">
                <h3 className="articles">
                    <a href={article.url}>{RT(article.title)}</a>
                </h3>
                <div className="article__synopsis">{RT(article.synopsis)}</div>
                <div>
                    {RT("Posted by:")} {RT(user?.name)} on {RT(formattedDate)}
                </div>
            </section>
        );
    }
};
