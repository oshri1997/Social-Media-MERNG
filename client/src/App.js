import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { AuthProvider } from "./context/auth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import { Container } from "semantic-ui-react";
import AuthRoute from "./AuthRoute";
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/register" component={Register} />
            <Route path="/posts/:postId" component={SinglePost} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
