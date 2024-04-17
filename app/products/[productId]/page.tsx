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
  // Handle case where product is not found
  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Product Not Found</h1>
      </div>
    );
  }
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
          alert("Done!");
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }

    // Call the function to execute the API request
    fetchData();
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
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
