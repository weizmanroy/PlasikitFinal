"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";

export default function Choose() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={() => (window.location.href = "/choose")}
        style={{
          position: "absolute",
          top: "120px",
          left: "20px",
          backgroundColor: "green",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "white",
          cursor: "pointer",
        }}
      >
        Back
      </button>

      <Link href={`/sign-in`} passHref>
        <button
          style={{
            border: "2px solid green",
            backgroundColor: "lightgreen",
            padding: "20px",
            margin: "10px",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Recycle a bottle
        </button>
      </Link>
    </div>
  );
}
