// Wrap the parent component with the `use client` pragma
"use client";

import React, { useState } from "react";
import { useUser } from "@descope/nextjs-sdk/client";
import { Card, Button } from "react-bootstrap";

export default function Profile() {
  const [image, setImage] = useState(null);
  const { user } = useUser();

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const totalGrams =
    (user?.customAttributes?.grams || 0) +
    (user?.customAttributes?.spentGrams || 0);

  return (
    <div
      className="container"
      style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
    >
      <Card
        style={{
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {user && (
          <div style={{ marginBottom: "20px" }}>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <strong>Hello "{user.name}"</strong>
            </div>
            <hr />
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <div>
                You have: <strong>{user.customAttributes.grams || 0}</strong>{" "}
                grams
              </div>
              <div>
                Spent: <strong>{user.customAttributes.spentGrams || 0}</strong>{" "}
                grams
              </div>
              <div>
                Total grams so far: <strong>{totalGrams}</strong> grams
              </div>
            </div>
          </div>
        )}

        <div
          className="profile-picture"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          {image ? (
            <img
              src={image}
              alt="Profile"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          ) : (
            <div
              className="default-profile"
              style={{
                padding: "50px",
                backgroundColor: "#f0f0f0",
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                display: "inline-block",
              }}
            >
              <p style={{ lineHeight: "150px", margin: 0 }}>
                No profile picture
              </p>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <Button variant="primary" as="span">
              Upload Profile Image
            </Button>
          </label>
        </div>
      </Card>
    </div>
  );
}
