import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  fetchAuth,
  fetchRegister,
  selectIsAuth,
} from "../../redux/slices/auth";

const Register = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Test",
      email: "Test123@test.com",
      password: "123456",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    console.log(values);
    const data = await dispatch(fetchRegister(values));
    console.log(data.payload);
    if (!data.payload) {
      return alert("Не удалось регистрироваться!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div variant="h5"> Create Account </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          name="fullName"
          placeholder="Full Name"
        />
        <input
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          name="password"
          placeholder="pass"
        />
        <button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
