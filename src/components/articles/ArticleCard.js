import React from "react";
import { useHistory } from "react-router-dom";
import "./Article.css";
import { replaceT } from "../tools/HelperFunctions";

export const ArticleCard = ({ article, user, handleDeleteArticle }) => {
    const activeUserId = sessionStorage.getItem("nutshell_user");
    const history = useHistory();
    const dateString = new Date(article.timestamp);
    const formattedDate = dateString.toDateString();
    if (activeUserId == article.userId) {
        return (
            <section className="article">
                <h3 className="articles">
                    <a href={article.url}> {replaceT(article.title)}</a>
                </h3>
                <div className="article__synopsis">
                    {replaceT(article.synopsis)}
                </div>
                <div>
                    {replaceT("Posted by:")} {replaceT(user?.name)} on{" "}
                    {replaceT(formattedDate)}
                </div>
                <button
                    onClick={() => history.push(`/articles/${article.id}/edit`)}
                >
                    {" "}
                    {replaceT("Edit Article")}{" "}
                </button>
                <button onClick={() => handleDeleteArticle(article.id)}>
                    {replaceT("Delete Article")}
                </button>
            </section>
        );
    } else {
        return (
            <section className="article">
                <h3 className="articles">
                    <a href={article.url}> {replaceT(article.title)}</a>
                </h3>
                <div className="article__synopsis">
                    {replaceT(article.synopsis)}
                </div>
                <div>
                    {replaceT("Posted by:")} {replaceT(user?.name)} on{" "}
                    {replaceT(formattedDate)}
                </div>
            </section>
        );
    }
};
