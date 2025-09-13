import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // Chat & Close icons

const ComradeAIWidget = ({ url = "https://comrade-ai.vercel.app/", width = 400, height = 600 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "none",
            background: "#2563eb", // blue color
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            cursor: "pointer",
            zIndex: 10000,
          }}
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chatbot Popup */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width,
            height,
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            zIndex: 9999,
            background: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header with Close Button */}
          <div
            style={{
              background: "#2563eb",
              color: "#fff",
              padding: "8px 12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Comrade AI
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* iFrame Chat */}
          <iframe
            src={url}
            title="Comrade AI"
            style={{ flex: 1, border: "none" }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
      )}
    </>
  );
};

export default ComradeAIWidget;
