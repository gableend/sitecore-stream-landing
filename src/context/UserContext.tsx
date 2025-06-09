"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";

interface UserContextType {
  role: string | null;
  industry: string | null;
  theme: string;
  setRole: (r: string) => void;
  setIndustry: (i: string) => void;
  reset: () => void;
}

const UserContext = createContext<UserContextType>({
  role: null,
  industry: null,
  theme: "",
  setRole: () => {},
  setIndustry: () => {},
  reset: () => {},
});

function getTheme(role: string | null) {
  switch (role) {
    case "Marketer":
      return "theme-marketer";
    case "Technologist":
      return "theme-technologist";
    case "Executive":
      return "theme-executive";
    default:
      return "";
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<string | null>(null);
  const [industry, setIndustryState] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedIndustry = localStorage.getItem("industry");
    if (storedRole) setRoleState(storedRole);
    if (storedIndustry) setIndustryState(storedIndustry);
  }, []);

  const setRole = (r: string) => {
    setRoleState(r);
    localStorage.setItem("role", r);
  };

  const setIndustry = (i: string) => {
    setIndustryState(i);
    localStorage.setItem("industry", i);
  };

  const reset = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("industry");
    setRoleState(null);
    setIndustryState(null);
  };

  const theme = getTheme(role);

  useEffect(() => {
    document.body.classList.remove(
      "theme-marketer",
      "theme-technologist",
      "theme-executive",
    );
    if (theme) document.body.classList.add(theme);
  }, [theme]);

  return (
    <UserContext.Provider
      value={{ role, industry, theme, setRole, setIndustry, reset }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
