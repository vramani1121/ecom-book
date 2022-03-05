import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { headerStyle } from "./style";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import ListItem from "@material-ui/core/ListItem";
import siteLogo from "../../assets/images/site-logo.svg";
import crossIcon from "../../assets/images/cross.svg";
import cartIcon from "../../assets/images/cart.png";
import flagIcon from "../../assets/images/flag.png";
import searchIcon from "../../assets/images/search.png";
import { materialCommonStyles } from "../../utils/materialCommonStyles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import { defaultFilter, StatusCode } from "../../constant/constant";
import { IListBook } from "../../service/book/book.model";
import bookService from "../../service/book/book.service";

const Header: React.FC = () => {
  const classes = headerStyle();
  const materialClasses = materialCommonStyles();
  const [open, setOpen] = React.useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  // for mobile menu
  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };

  const filter = defaultFilter;
  filter.pageSize = 100;
  const [bookRecords, setBookRecords] = useState<IListBook[]>([]);

  const searchAllBooks = () => {
    setLoading(true);
    bookService.getAll(filter).then((res) => {
      if (res && res.code === StatusCode.Success) {
        setBookRecords(res.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (searchKeyword) {
      filter.keyword = searchKeyword;
      searchAllBooks();
    }
  }, [searchKeyword]);
  return (
    <div className={classes.headerWrapper}>
      <AppBar className="site-header" id="header" position="static">
        <div
          className="top-header"
          style={{ display: open ? "none" : "block" }}
        ></div>
        <div className="bottom-header">
          <div className="container">
            <div className="header-wrapper">
              <div className="logo-wrapper">
                <Link to="/" className="site-logo" title="logo">
                  <img src={siteLogo} alt="logo" />
                </Link>
              </div>
              <div className="nav-wrapper">
                <div className="top-right-bar">
                  <List className="top-nav-bar">
                    <ListItem>
                      <Link to="/login" title="Login">
                        Login
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/register" title="Register">
                        Register
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/user" title="User">
                        User
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/category" title="Category">
                        Category
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to="/book" title="Category">
                        Book
                      </Link>
                    </ListItem>
                  </List>
                  <List className="cart-country-wrap">
                    <ListItem className="cart-link">
                      <Link to="/" title="Cart">
                        <img src={cartIcon} alt="cart.png" />
                        <span>0</span>
                        Cart
                      </Link>
                    </ListItem>
                    <ListItem className="hamburger" onClick={openMenu}>
                      <span></span>
                    </ListItem>
                  </List>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-search-wrapper">
          <div className="container">
            <div className="header-search-outer">
              <div className="header-search-inner">
                <div className="text-wrapper">
                  <TextField
                    id="text"
                    name="text"
                    placeholder="What are you looking for..."
                    variant="outlined"
                    onChange={(e) => {
                      setSearchKeyword(e.target.value?.trim());
                    }}
                  />
                  {searchKeyword && (
                    <div className="product-listing">
                      {bookRecords?.length ? (
                        <>
                          <List className="related-product-list">
                            {bookRecords.map((book) => (
                              <ListItem key={book.id}>
                                <div className="inner-block">
                                  <div className="left-col">
                                    <span className="title">{book.name}</span>
                                    <p>{book.description}</p>
                                  </div>
                                  <div className="right-col">
                                    <span className="price">{book.price}</span>
                                    <Link to="/">Add to cart</Link>
                                  </div>
                                </div>
                              </ListItem>
                            ))}
                          </List>
                        </>
                      ) : (
                        <>
                          {loading ? (
                            <p className="loading">Loading....</p>
                          ) : (
                            <p className="no-product">No product found</p>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="green-btn btn"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  <em>
                    <img src={searchIcon} alt="search" />
                  </em>
                  Search
                </Button>
                {/* <Button
                  type="submit"
                  className="btn pink-btn"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Cancel
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default Header;
