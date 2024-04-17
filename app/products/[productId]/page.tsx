"use client";
import { log } from "console";
import data from "../../products.json";
import { use } from "react";
import { useSession } from "@descope/nextjs-sdk/client";

function getProduct(id: any) {
  return data.items.find((p) => p.id === id);
}

export default function ProductDetail({ params }: any) {
  const productId = params.productId;
  const product = getProduct(productId);
  const sess = useSession();
  // Handle case where product is not found
  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Product Not Found</h1>
      </div>
    );
  }
  const handleClick = () => {
    // Function to download a file
    function downloadFile(data, filename) {
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    // Fetch data from the server
    const apiUrl = `${(window as any)?.location?.origin}/api/submit`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include other headers as necessary
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parses the JSON returned from the server
      })
      .then((data) => {
        // Download the file
        downloadFile(data, `product_${productId}.json`);
        alert("File downloaded successfully!");
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  };

  return (
    <div>
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
    </div>
  );
}
