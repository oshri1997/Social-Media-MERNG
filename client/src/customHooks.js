import { useState } from "react";

export const useForm = (callback, initialState) => {
  const [formValues, setFormValues] = useState(initialState);

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback(); //addUser
  };
  return {
    formValues,
    onChange,
    onSubmit,
  };
};
