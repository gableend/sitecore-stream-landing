"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CopilotButton() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; text: string }>>(
    [],
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: crypto.randomUUID(), text: input }]);
    setInput("");
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-sitecore-core-red text-white rounded-full px-4 py-2 shadow-lg"
        onClick={() => setOpen(true)}
      >
        Ask Copilot
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end z-50">
          <div className="bg-background w-full max-w-md m-4 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">Copilot</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="h-60 overflow-y-auto border rounded mb-2 p-2 space-y-2">
              {messages.map((m) => (
                <div key={m.id} className="p-2 bg-muted rounded">
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                className="flex-1 border rounded-l p-2 bg-background"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button className="rounded-l-none" onClick={handleSend}>
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
