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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirm)
      console.error(
        "The confirmation password does not match the entered one.",
      );
    if (!fullName.includes(" "))
      console.error("The name does not contain a surname.");
    if (!validateEmail(email)) console.error("The email entered is not valid.");
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {/* Full Name Input */}
      <InputContainer>
        <label className="label" htmlFor="fullNameInput">
          Full Name
        </label>
        <input
          className="input"
          type="text"
          name="fullName"
          id="fullNameInput"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
          className="input"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </InputContainer>

      {/* Submit Button */}
      <button className="btn">Update Profile</button>
    </form>
  );
}
