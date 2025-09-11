import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Arial, sans-serif",
  headerBgColor: "#2563eb", // blue-600
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#2563eb",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

export default function ChatBotWidget() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        floating // makes it float in bottom-right
        headerTitle="Comrade AI"
        steps={[
          {
            id: "1",
            message: "👋 Hi! How can I help you today?",
            trigger: "2",
          },
          {
            id: "2",
            user: true,
            trigger: "3",
          },
          {
            id: "3",
            message:
              "Thanks for your message! Our offcials will get back to you soon",
             end: true,
          },
          // {
          //   id: "4",
          //   message:
          //     "Kindely sumbit your isuue...",
          //   trigger: "5"
          // },
          // {
          //   id: "5",
          //   message:
          //     "your issues has been sent to the Officials! they will resolve your problem soon!!!",
          //     trigger: "6"
          // },
          // {
          //   id: "6",
          //   message:
          //     "anythigs else i can help you today??",
          //   end: true,
          // },
        ]}
      />
    </ThemeProvider>
  );
}

