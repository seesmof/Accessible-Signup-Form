import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const InputContainer = ({ children }: ContainerProps) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export default function Form() {
  return (
    <form className="flex flex-col gap-3">
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
        />
      </InputContainer>

      {/* Email Input */}
      <InputContainer>
        <label htmlFor="emailInput" className="label">
          Email
        </label>
        <input type="email" name="email" id="emailInput" className="input" />
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
        />
      </InputContainer>

      {/* Submit Button */}
      <button className="btn">Update Profile</button>
    </form>
  );
}
