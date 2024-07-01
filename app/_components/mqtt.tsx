// @ts-ignore
"use client";

import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

interface PageProps {
  onMessageReceived: (message: any) => void;
}

const MQTTPage: React.FC<PageProps> = ({ onMessageReceived }) => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Connect to the MQTT broker using the secure WebSocket endpoint
    const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");

    // Subscribe to the topic
    client.subscribe("plastikit/status", (err) => {
      if (err) {
        console.error("Subscription error:", err);
      }
    });

    // Handle incoming messages
    client.on("message", (topic, message) => {
      const newMessage = message.toString();
      setLastMessage(newMessage);

      // Pass the message to the parent component
      onMessageReceived(newMessage);

      // Store the last message in local storage
      localStorage.setItem("lastMessage", newMessage);
    });

    // Retrieve last message from local storage on component mount
    const storedLastMessage = localStorage.getItem("lastMessage");
    if (storedLastMessage) {
      setLastMessage(storedLastMessage);
      onMessageReceived(storedLastMessage);
    }

    // Clean up when component unmounts
    return () => {
      client.end();
    };
  }, [onMessageReceived]);

  return (
    <div>
      <h1>MQTT Messages</h1>
      <div>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default MQTTPage;
