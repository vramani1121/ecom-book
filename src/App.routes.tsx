import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register/index";
import User from "./pages/user/index";
import Category from "./pages/category/index";
import EditUser from "./pages/user/edituser/index";
import EditCategory from "./pages/category/editCategory/index";
import EditBook from "./pages/book/editBook/index";
import Book from "./pages/book/index";
import BookList from "./pages/book-listing";

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={BookList} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/user" component={User} />
      <Route exact path="/edit-user/:id" component={EditUser} />
      <Route exact path="/category" component={Category} />
      <Route exact path="/edit-category/:id" component={EditCategory} />
      <Route exact path="/add-category" component={EditCategory} />
      <Route exact path="/book" component={Book} />
      <Route exact path="/edit-book/:id" component={EditBook} />
      <Route exact path="/add-book" component={EditBook} />
    </Switch>
  );
};

export default AppRoutes;
