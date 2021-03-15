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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            {/* <Redirect to="/" /> */}
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
