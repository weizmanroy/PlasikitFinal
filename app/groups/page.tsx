"use client";
import { useEffect } from "react";
import { UserManagement } from "@descope/nextjs-sdk";

export default function GroupsPage() {
  useEffect(() => {
    console.log("UserManagement widget initialized");
    // Additional debugging or initialization logic can go here
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={styles.heading}>Users Managament</h1>

      <UserManagement
        widgetId="user-management-widget"
        tenant="T2hh4ztHpempjoUv3a6gNaeF0xLY"
        theme="light" // light / dark / os (auto detect)
      />
      <button
        onClick={() => (window.location.href = "/choose")}
        type="button"
        className="fixed top-32 left-5 flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
      >
        <svg
          className="w-5 h-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Back</span>
      </button>
    </div>
  );
}

const styles = {
  heading: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "2.5rem",
    color: "#333",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
};
