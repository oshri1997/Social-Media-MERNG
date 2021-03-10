import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useForm } from "../customHooks";

const Register = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { formValues, onChange, onSubmit } = useForm(
    registerCallBack,
    initialState
  );

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formValues,
  });
  function registerCallBack() {
    addUser();
  }

  return (
    <div style={{ width: 400, margin: "auto" }}>
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <Header as="h2" textAlign="center">
          Register
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
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
          value={formValues.email}
          onChange={onChange}
          error={errors.email}
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
        <Form.Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          autoComplete="false"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {/* {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
