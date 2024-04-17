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
      <Link href={`/`} passHref>
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
          Print a 3D model
        </button>
      </Link>

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
