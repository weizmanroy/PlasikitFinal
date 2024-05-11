"use client";
import { log } from "console";
import data from "../../products.json";
import { use } from "react";
import { useSession, useUser } from "@descope/nextjs-sdk/client";

function getProduct(id: any) {
  return data.items.find((p) => p.id === id);
}

export default function ProductDetail({ params }: any) {
  const productId = params.productId;
  const product = getProduct(productId);
  const sess = useSession();
  const { user } = useUser();

  const handleClick = () => {
    function fetchData() {
      const apiUrl = `${(window as any)?.location?.origin}/api/submit`;
      console.log(apiUrl);
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include other headers as necessary
        },
        body: JSON.stringify({ productId, userId: user.userId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parses the JSON returned from the server
        })
        .then((data) => {
          // After sending to print, initiate file download
          downloadFile(data.filePath);
          alert("Done!");
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }

    // Function to initiate file download
    function downloadFile(filePath: string) {
      fetch(filePath)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement("a");
          a.href = url;
          a.download = "printed_file.pdf"; // Set desired file name here
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("There was a problem downloading the file:", error);
        });
    }

    // Call the function to execute the API request
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
    <div style={{ textAlign: "center", padding: "20px" }}>
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
      <h1>Product ID: {productId}</h1>
      <h2>Name: {product.name}</h2>
      <p>Description: {product.description}</p>
      <p>Grams: {product.grams}</p>
      <img
        src={product.imageURL}
        alt={product.name}
        style={{ maxWidth: "100%" }}
      />
      <button
        onClick={handleClick}
        style={{
          border: "2px solid green",
          backgroundColor: "lightgreen",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "white",
          cursor: "pointer",
        }}
      >
        Send to print
      </button>
    </div>
  );
}
