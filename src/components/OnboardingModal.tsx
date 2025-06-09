"use client";

import { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";
import { Button } from "@/components/ui/button";

export default function OnboardingModal() {
  const { role, industry, setRole, setIndustry } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [r, setR] = useState(role || "");
  const [i, setI] = useState(industry || "");

  useEffect(() => {
    if (!role || !industry) {
      setShow(true);
    }
  }, [role, industry]);

  const handleSubmit = () => {
    if (r && i) {
      setRole(r);
      setIndustry(i);
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Welcome to Sitecore.ai</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              className="w-full border rounded p-2 bg-background"
              value={r}
              onChange={(e) => setR(e.target.value)}
            >
              <option value="">Select a role</option>
              <option>Marketer</option>
              <option>Technologist</option>
              <option>Executive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Industry</label>
            <select
              className="w-full border rounded p-2 bg-background"
              value={i}
              onChange={(e) => setI(e.target.value)}
            >
              <option value="">Select an industry</option>
              <option>Retail</option>
              <option>Financial Services</option>
              <option>Manufacturing</option>
              <option>Healthcare</option>
              <option>IT</option>
            </select>
          </div>
          <Button
            className="w-full bg-sitecore-purple text-white"
            onClick={handleSubmit}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
