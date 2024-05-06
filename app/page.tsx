// Wrap the parent component with the `use client` pragma
"use client";

import Image from "next/image";
import Link from "next/link";
import data from "./products.json";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const sdk = useDescope();
  const handleLogout = () => {
    sdk.logout();
  };
  useEffect(() => {
    if (!isAuthenticated && !isSessionLoading) {
      router.push("/sign-in");
    }
  }, [isSessionLoading, isAuthenticated]);

  if (isSessionLoading) {
    return <div>Loading</div>;
  }
  return (
    <div
      style={{
        border: "1px solid gray",
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
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
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer",
          fontFamily: "rubik light",
          padding: "7px 20px",
          textAlign: "center",
          textDecoration: "none",
          transition: "all 250ms",
          fontSize: "16px",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "manipulation",
          color: "white",
        }}
      >
        Logout
      </button>

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

      <div style={{ maxHeight: "600px", width: "70%" }}>
        {data.items.map((item, index) => (
          <Link key={item.id} href={`/products/${item.id}`} passHref>
            <div
              style={{
                textDecoration: "none",
                color: "inherit",

                border: "1px solid #ccc",
                padding: "10px",
                minWidth: "300px",
                maxWidth: "300px",
                marginRight: index % 3 === 2 ? "0" : "20px", // Add margin right except for the last item in a row
                marginBottom: "20px",
                cursor: "pointer",
                display: "inline-block",
                verticalAlign: "top", // Align items to the top of the container
              }}
            >
              <div
                style={{ width: "100%", height: "200px", position: "relative" }}
              >
                <Image
                  src={item.imageURL}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.grams} gr</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
