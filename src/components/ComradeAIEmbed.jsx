// src/components/ComradeAIEmbed.jsx
import React from "react";

const ComradeAIEmbed = ({ url = "https://comrade-ai.vercel.app/" }) => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={url}
        title="Comrade AI"
        style={{ width: "100%", height: "100%", border: "none" }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  );
};

export default ComradeAIEmbed;
