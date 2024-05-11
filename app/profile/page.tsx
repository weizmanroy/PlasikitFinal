// Wrap the parent component with the `use client` pragma
"use client";

import React, { useState } from "react";
import { useUser } from "@descope/nextjs-sdk/client";

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
    <div className="container">
      <h1>Profile Page</h1>
      <div
        style={{
          position: "absolute",
          top: "50px",
          right: "25px",
          border: "1px solid green",
          padding: "5px",
          backgroundColor: "#e6f0e8",
          borderRadius: "10px",
          color: "green",
          display: "inline-block",
          fontFamily:
            "CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif",
          padding: "7px 20px",
          textAlign: "center",
          textDecoration: "none",
          transition: "all 250ms",
          fontSize: "20px",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "manipulation",
        }}
      >
        {user && (
          <>
            <div>
              <strong>Hello "{user.name}"</strong>
            </div>
            <div>-------------</div>
            <div>
              You have: <strong>{user?.customAttributes?.grams || 0}</strong>{" "}
            </div>
            <div>
              Spent: <strong>{user?.customAttributes?.spentGrams || 0}</strong>{" "}
            </div>
            <div>
              Total grams so far: <strong>{totalGrams}</strong>{" "}
            </div>
          </>
        )}
      </div>

      <div className="profile-picture">
        {image ? (
          <img src={image} alt="Profile" />
        ) : (
          <div className="default-profile">
            <p>No profile picture uploaded</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
    </div>
  );
}
