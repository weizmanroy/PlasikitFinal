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

  return (
    <div className="container">
      <h1>Profile Page</h1>
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "10px",
          border: "1px solid green",
          padding: "5px",
          backgroundColor: "#c2fbd7",
          borderRadius: "5px",
        }}
      >
        {user && `Hello ${user.name}`}
      </div>

      <div
        style={{
          position: "absolute",
          top: "100px",
          right: "10px",
          border: "1px solid green",
          padding: "5px",
          backgroundColor: "#c2fbd7",
          borderRadius: "100px",
          boxShadow:
            "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px", // Apply box shadow
          color: "green",
          display: "inline-block",
          fontFamily: "rubik light",
          padding: "7px 20px",
          textAlign: "center",
          textDecoration: "none",
          transition: "all 250ms",
          fontSize: "16px",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "manipulation",
        }}
      >
        {user &&
          `${user.name} have ${user?.customAttributes?.grams || 0} grams`}
      </div>

      <div
        style={{
          position: "absolute",
          top: "150px",
          right: "10px",
          border: "1px solid green",
          padding: "5px",
          backgroundColor: "#c2fbd7",
          borderRadius: "100px",
          boxShadow:
            "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px",
          color: "green",
          display: "inline-block",
          fontFamily:
            "CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif",
          padding: "7px 20px",
          textAlign: "center",
          textDecoration: "none",
          transition: "all 250ms",
          fontSize: "16px",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "manipulation",
        }}
      >
        {user &&
          `${user.name} spent ${user?.customAttributes?.spentGrams || 0} grams`}
      </div>

      <div
        style={{
          position: "absolute",
          top: "200px",
          right: "10px",
          border: "1px solid green",
          padding: "5px",
          backgroundColor: "#c2fbd7",
          borderRadius: "100px",
          boxShadow:
            "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px",
          color: "green",
          display: "inline-block",
          fontFamily:
            "CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif",
          padding: "7px 20px",
          textAlign: "center",
          textDecoration: "none",
          transition: "all 250ms",
          fontSize: "16px",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "manipulation",
        }}
      >
        {user &&
          `${user.name} has total (${
            user?.customAttributes?.spentGrams +
            (user?.customAttributes?.grams || 0)
          } grams)`}
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
