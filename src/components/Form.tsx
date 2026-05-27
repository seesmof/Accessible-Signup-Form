"use client";

import React, { ReactNode, useState } from "react";

interface ContainerProps {
  children: ReactNode;
}

const InputContainer = ({ children }: ContainerProps) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};
export default function Form() {
  const [fullName, setFullName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [confirm, setConfirm] = useState<string>("");
  const [confirmError, setConfirmError] = useState<boolean>(false);

  const handleReset = () => {
    setFullName("");
    setNameError(false);

    setEmail("");
    setEmailError(false);

    setPassword("");
    setPasswordError(false);

    setConfirm("");
    setConfirmError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmError(false);

    if (!fullName.includes(" ")) {
      setNameError(true);
    }
    if (!validateEmail(email)) {
      setEmailError(true);
    }
    if (password.length < 8) {
      setPasswordError(true);
    }
    if (password !== confirm) {
      setConfirmError(true);
    }

    if (
      nameError === false &&
      emailError === false &&
      passwordError === false &&
      !confirmError === false
    ) {
      handleReset();
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {/* Full Name Input */}
      <InputContainer>
        <label className="label" htmlFor="fullNameInput">
          Full Name
        </label>
        <input
          className={`input ${nameError && "input-error"}`}
          type="text"
          name="fullName"
          id="fullNameInput"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        {nameError && (
          <p className="text-red-600 text-sm">
            Please enter a valid full name.
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
          name="email"
          id="emailInput"
          className={`input ${emailError && "input-error"}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && (
          <p className="text-red-600 text-sm">Please enter a valid email.</p>
        )}
      </InputContainer>

      {/* Password Input */}
      <InputContainer>
        <label htmlFor="passwordInput" className="label">
          Enter Password
        </label>
        <input
          type="password"
          name="password"
          id="passwordInput"
          className={`input ${passwordError && "input-error"}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && (
          <p className="text-red-600 text-sm">
            Please enter a password with 8+ characters.
          </p>
        )}
      </InputContainer>

      {/* Password Confirmation Input */}
      <InputContainer>
        <label htmlFor="confirmInput" className="label">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm"
          id="confirmInput"
          className={`input ${confirmError && "input-error"}`}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        {confirmError && (
          <p className="text-red-600 text-sm">
            The confirmation password doesn`t match
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
