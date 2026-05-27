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
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [confirm, setConfirm] = useState<string>("");
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);

  const handleReset = () => {
    setFullName("");
    setNameError(false);

    setEmail("");
    setEmailError(false);

    setPassword("");
    setPasswordError(false);
    setPasswordVisible(false);

    setConfirm("");
    setConfirmError(false);
    setConfirmVisible(false);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

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
          aria-required
        />
        {nameError && (
          <p className="text-red-600 text-sm" aria-invalid>
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
          aria-required
        />
        {emailError && (
          <p className="text-red-600 text-sm" aria-invalid>
            Please enter a valid email.
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
            name="password"
            id="passwordInput"
            className={`input ${passwordError && "input-error"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required
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
        {passwordError && (
          <p className="text-red-600 text-sm" aria-invalid>
            Please enter a password with 8+ characters.
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
            name="confirm"
            id="confirmInput"
            className={`input ${confirmError && "input-error"}`}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            aria-required
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
        {confirmError && (
          <p className="text-red-600 text-sm" aria-invalid>
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
