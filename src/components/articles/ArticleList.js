import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import APIManager from "../../modules/APIManager";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const apiManager = new APIManager();

    const getArticles = () => {
        return apiManager.getAll("articles", ["user"]).then((apiArticles) => {
            setArticles(apiArticles);
        });
    };

    // EDIT : COLIN

    const [friendIdArray, setFriendIdArray] = useState([]);
    const getActiveArticles = () => {
        return apiManager
            .getAllByUserArray("articles", [...friendIdArray], ["user"])
            .then((apiArticles) => {
                setArticles(apiArticles);
            })
            .then(console.log(articles));
    };

    const getActiveFriends = () => {
        return apiManager.getFriends().then((friendsRes) => {
            setFriendIdArray(friendsRes.map((friend) => friend.userId));
        });
    };

    useEffect(() => {
        getActiveFriends();
    }, []);
    useEffect(() => {
        getActiveArticles();
    }, [friendIdArray]);
    // END EDIT

    // const getUserArticles = (userId) => {
    //     return apiManager
    //         .getAllByUserId("articles", userId, ["user"])
    //         .then((userArticle) => {
    //             setArticles(userArticle);
    //         });
    // };

    // useEffect(() => {
    //     getArticles();
    // }, []);

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
