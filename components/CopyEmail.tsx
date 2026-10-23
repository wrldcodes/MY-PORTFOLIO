"use client";

import { useState } from "react";

/** Copy-to-clipboard button. The message is the only state. */
export function CopyEmail({ email }: { email: string }) {
  const [message, setMessage] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage("Email copied");
    } catch {
      setMessage("Copy failed. Use the email above.");
    }
    setTimeout(() => setMessage(""), 2400);
  }

  return (
    <>
      <button className="copy mag" type="button" onClick={copy}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
        Copy email
      </button>
      <span className="toast mono" role="status">{message}</span>
    </>
  );
}
