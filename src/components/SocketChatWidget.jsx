import React, { useState } from "react";
import { X } from "lucide-react";

const SocketChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // aligns to left
        zIndex: 1000,
      }}
    >
      {/* Chat Icon */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#1f3c88",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "28px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            marginBottom: "10px",
          }}
        >
          💬
        </div>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div
          style={{
            width: "400px",
            height: "600px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#1f3c88",
              color: "white",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Quick Chat</span>
            <X
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
            />
          </div>

          {/* Iframe */}
          <iframe
            src="https://quickchat-6vkt.onrender.com/"
            style={{
              flex: 1,
              border: "none",
              width: "100%",
            }}
            title="Socket.IO Chat"
          />
        </div>
      )}
    </div>
  );
};

export default SocketChatWidget;
