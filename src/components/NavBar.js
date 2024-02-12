import * as React from "react";

import { styled, alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { AppBar, Box, IconButton, InputBase, Toolbar } from "@mui/material";
import logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { searchedUser } from "../Redux/Slices/UserDetails";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  display: "flex",
  alignItems: "center",
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const Tabs = styled(NavLink)(({ theme }) => ({
  fontSize: 20,
  color: "inherit",
  textDecoration: "none",
  marginRight: 20,
  "&.active": {
    color: "#FC6736",
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const [searchedData, setSearchedData] = useState("");
  const userCount = useSelector((state) => state.app.users.length);
  useEffect(() => {
    dispatch(searchedUser(searchedData));
  }, [dispatch, searchedData]);

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ background: "#063970" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton>
              <img src={logo} alt="logo" />
            </IconButton>

            <Tabs to="/">Home</Tabs>
            <Tabs to="/create">Add Users</Tabs>
            <Tabs to="/read">All Users ({userCount})</Tabs>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search any user…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setSearchedData(e.target.value);
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;
