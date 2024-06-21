"use client";
import { useSession, useUser } from "@descope/nextjs-sdk/client";
import data from "../../products.json";
import { useState } from "react";
import Image from "next/image"; // הוסף את הייבוא של Image מ-next/image

function getProduct(id: string) {
  return data.items.find((p) => p.id === id);
}

export default function ProductDetail({ params }) {
  const productId = params.productId;
  const product = getProduct(productId);
  const sess = useSession();
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    if (!product || !user) {
      console.error("Product or user not found");
      return;
    }

    if (user.grams < product.grams) {
      const message =
        "You do not have enough grams to download this model. Please collect more bottles to earn grams.";
      setErrorMessage(message);
      alert(message); // Added detailed alert message
      return;
    }

    setErrorMessage(""); // Clear any previous error messages

    function fetchData() {
      const apiUrl = `${window.location.origin}/api/submit`;
      console.log(apiUrl);
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId: user.userId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          downloadFile(product.filePath);
          alert("Done!");
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }

    function downloadFile(filePath: string | URL | Request) {
      fetch(filePath)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filePath.split("/").pop() || "downloaded_file.stl";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("There was a problem downloading the file:", error);
        });
    }

    fetchData();
  };

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "130px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => (window.location.href = "/")}
        type="button"
        className="fixed top-20 left-5 flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
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
        <span>Go back</span>
      </button>
      <Image
        src={product.imageURL}
        alt={product.name}
        width={500}
        height={500}
        style={{ maxWidth: "40%", marginRight: "20px" }} // Decreased the size of the picture and adjusted margin
      />
      <div
        style={{
          flex: "1",
          textAlign: "left",
          padding: "40px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            marginBottom: "15px",
            color: "#333",
          }}
        >
          Product ID: {productId}
        </h1>
        <h2
          style={{
            fontSize: "24px",
            margin: "10px 0",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Name: {product.name}
        </h2>
        <p
          style={{
            fontSize: "16px",
            margin: "10px 0",
            color: "#666",
          }}
        >
          Description: {product.description}
        </p>
        <p
          style={{
            fontSize: "16px",
            margin: "10px 0",
            color: "#666",
          }}
        >
          Grams: {product.grams}
        </p>
        {errorMessage && (
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            {errorMessage}
          </p>
        )}
        <button
          onClick={handleClick}
          style={{
            border: "2px solid darkgreen",
            backgroundColor: "green",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            cursor: "pointer",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "darkgreen";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "green";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Download 3D model
        </button>
      </div>
    </div>
  );
}
