// src/app/page.tsx

// Mark this component as a Client Component
"use client";

import React, { useEffect, useState } from "react";
import mqtt from "mqtt"; // Import the mqtt library

const MQTTPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Connect to the MQTT broker
    const client = mqtt.connect("mqtt://broker.emqx.io:8083/mqtt");

    // Subscribe to the topic
    client.subscribe("plastikit/roy/status/#");

    // Handle incoming messages
    client.on("message", (topic: any, message: { toString: () => string }) => {
      // Add the received message to the state
      setMessages((prevMessages) => [...prevMessages, message.toString()]);
    });

    // Clean up when component unmounts
    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>MQTT Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MQTTPage;
