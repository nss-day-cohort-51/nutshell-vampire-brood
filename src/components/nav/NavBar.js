import React from "react";
import { RT } from "../tools/HelperFunctions";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Weather } from "../../modules/Weather";
import { Button } from "@mui/material";
import { useHistory } from "react-router";

export const NavBar = (props) => {
  const history = useHistory();

  return (
    <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Articles
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/friends">
            Friends
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/messages">
            Messages
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tasks">
            Tasks
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/events">
          Events
          </Link>
        </li>
      </ul>
      <Button onClick={ () => {sessionStorage.clear(); history.push(`/login`)}}>Log out</Button>
      <Weather />
    </nav>
  );

};
