// imports
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import "./SearchBar.css";

// render
import React from "react";

export const SearchBar = ({ onSubmitHandler, onChangeHandler }) => {
    return (
        <div>
            <TextField
                id="searchText"
                label="Search Users"
                variant="outlined"
                onChange={(event) => onChangeHandler(event.target.value)}
            />
            <SearchIcon onClick={() => onSubmitHandler()} />
        </div>
    );
};
