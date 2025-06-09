"use client";

import { useEffect } from "react";
import { UserProvider } from "@/context/UserContext";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    document.body.classList.add("antialiased");
  }, []);

  return (
    <UserProvider>
      <div className="antialiased">{children}</div>
    </UserProvider>
  );
}
