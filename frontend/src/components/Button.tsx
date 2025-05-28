// src/components/Button.tsx
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      style={{
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        backgroundColor: "#007bff",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer",
        opacity: rest.disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}
