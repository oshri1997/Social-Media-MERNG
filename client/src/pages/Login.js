import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useForm } from "../customHooks";

const Login = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const initialState = {
    username: "",
    password: "",
  };
  const { formValues, onChange, onSubmit } = useForm(
    loginCallBack,
    initialState
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      history.push("/");
    },
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formValues,
  });
  function loginCallBack() {
    loginUser();
  }

  return (
    <div style={{ width: 400, margin: "auto" }}>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Header as="h2" textAlign="center">
          Login
        </Header>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          value={formValues.username}
          onChange={onChange}
          error={errors.username}
        />
        <Form.Input
          type="password"
          label="Password"
          autoComplete="false"
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={onChange}
          error={errors.password}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors)[0] === "general" && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;
