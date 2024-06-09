// Home.js

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import data from "./products.json";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Footer from "./_components/Footer";

const UserDetail = ({ user }) => {
  const totalGrams =
    (user?.customAttributes?.grams || 0) +
    (user?.customAttributes?.spentGrams || 0);

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        right: "25px",
        border: "0px solid green",
        padding: "5px",
        backgroundColor: "#f2f5f2",
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
  );
};

export default function Home() {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const sdk = useDescope();

  useEffect(() => {
    if (!isAuthenticated && !isSessionLoading) {
      router.push("/sign-in");
    }
  }, [isSessionLoading, isAuthenticated]);

  if (isSessionLoading) {
    return <div>Loading</div>;
  }

  const handleLogout = () => {
    sdk.logout();
    router.push("/sign-in");
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid gray",
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
        }}
      >
        <UserDetail user={user} />

        <button
          onClick={() => (window.location.href = "/choose")}
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
          <span>Back</span>
        </button>

        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            fontFamily: "Light 300",
            padding: "7px 20px",
            textAlign: "center",
            textDecoration: "none",
            transition: "background-color 0.3s", // Add transition for background-color
            fontSize: "12px",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "manipulation",
            color: "white",
            display: "flex", // Make the button a flex container
            alignItems: "center", // Center the content vertically
          }}
        >
          Logout
          <ExitToAppIcon style={{ marginLeft: "5px" }} /> {/* Add exit icon */}
        </button>

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
                  marginRight: index % 3 === 2 ? "0" : "20px",
                  marginBottom: "20px",
                  cursor: "pointer",
                  display: "inline-block",
                  verticalAlign: "top",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    position: "relative",
                  }}
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
      <Footer />
    </div>
  );
}
