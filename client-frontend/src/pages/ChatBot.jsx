import React from 'react'
import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"

export default function ChatBot() {
  return (
    Chatbot.initFull({
        chatflowid: "96ab0264-08bd-4d41-afb2-8356e520de58",
        apiHost: "http://localhost:3005",
    })
  )
}
