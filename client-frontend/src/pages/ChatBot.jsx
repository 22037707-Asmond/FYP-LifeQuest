import React, { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    const loadChatbot = async () => {
      try {
        const { default: Chatbot } = await import("https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js");
        Chatbot.init({
          chatflowid: "96ab0264-08bd-4d41-afb2-8356e520de58",
          apiHost: "http://localhost:3005",
        });
      } catch (error) {
        console.error("Error loading chatbot:", error);
      }
    };

    loadChatbot();

    return () => {
      // Clean up function to uninitialize the chatbot if needed
      const chatbotContainer = document.getElementById("chatbot-container");
      if (chatbotContainer) {
        chatbotContainer.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      id="chatbot-container"
    ></div>
  );
};

export default ChatBot;
