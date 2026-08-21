"use client";

import React, { ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type ContainerProps = {
  children: ReactNode;
};

const InputContainer = ({ children }: ContainerProps) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

export default function Form() {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  const handleReset = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
    setValue("passwordConfirm", "");
    setPasswordVisible(false);
    setConfirmVisible(false);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    handleReset();
  };

  /* 
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setConfirmError(true);
    }
  };
   */

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name Input */}
      <InputContainer>
        <label className="label" htmlFor="fullNameInput">
          Full Name
        </label>
        <input
          className={`input w-full ${errors.name && "input-error"}`}
          type="text"
          id="fullNameInput"
          required
          aria-required
          {...register("name", {
            validate: {
              hasSpace: (value) =>
                value.includes(" ") || "The username must be a full name.",
            },
          })}
        />
        {errors.name && (
          <p className="text-error text-sm" aria-invalid>
            {errors.name?.message}
          </p>
        )}
      </InputContainer>

      {/* Email Input */}
      <InputContainer>
        <label htmlFor="emailInput" className="label">
          Email
        </label>
        <input
          type="email"
          id="emailInput"
          className={`input w-full ${errors.email && "input-error"}`}
          required
          aria-required
          {...register("email", {
            validate: {
              isValidEmail: (value) =>
                validateEmail(value) || "An email must be a valid address.",
            },
          })}
        />
        {errors.email && (
          <p className="text-error text-sm" aria-invalid>
            {errors.email?.message}
          </p>
        )}
      </InputContainer>

      {/* Password Input */}
      <InputContainer>
        <label htmlFor="passwordInput" className="label">
          Enter Password
        </label>
        <div className="flex flex-row gap-1">
          <input
            type={passwordVisible ? "text" : "password"}
            id="passwordInput"
            className={`input w-full ${errors.password && "input-error"}`}
            required
            aria-required
            {...register("password", {
              minLength: {
                value: 8,
                message: "The password must be at least 8 characters long.",
              },
            })}
          />
          <button
            className="btn"
            type="button"
            onClick={() =>
              setPasswordVisible((passwordVisible) => !passwordVisible)
            }
          >
            {passwordVisible ? "❌" : "✅"}
          </button>
        </div>
        {errors.password && (
          <p className="text-error text-sm" aria-invalid>
            {errors.password?.message}
          </p>
        )}
      </InputContainer>

      {/* Password Confirmation Input */}
      <InputContainer>
        <label htmlFor="confirmInput" className="label">
          Confirm Password
        </label>
        <div className="flex flex-row gap-1">
          <input
            type={confirmVisible ? "text" : "password"}
            id="confirmInput"
            className={`input w-full ${errors.passwordConfirm && "input-error"}`}
            required
            aria-required
            {...register("passwordConfirm", {
              validate: {
                doesEqualToPassword: (value) =>
                  getValues("password") === getValues("passwordConfirm") ||
                  "The password must be the same.",
              },
            })}
          />
          <button
            className="btn"
            type="button"
            onClick={() =>
              setConfirmVisible((confirmVisible) => !confirmVisible)
            }
          >
            {confirmVisible ? "❌" : "✅"}
          </button>
        </div>
        {errors.passwordConfirm && (
          <p className="text-sm text-error" aria-invalid>
            {errors.passwordConfirm?.message}
          </p>
        )}
      </InputContainer>

      {/* Submit Button */}
      <div className="flex flex-row gap-3">
        <button className="btn" type="reset" onClick={handleReset}>
          Reset
        </button>
        <button className="btn flex-1" type="submit">
          Update Profile
        </button>
      </div>
    </form>
  );
}
