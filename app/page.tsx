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
      <div style={{ marginBottom: "auto", textAlign: "center" }}>
        {user && `Hello ${user.name}`}
      </div>
      <div
        style={{
          position: "absolute",
          top: "100px",
          right: "10px",
          border: "1px solid green",
          padding: "5px",
          backgroundColor: "lightgreen",
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
          backgroundColor: "lightgreen",
        }}
      >
        {user &&
          `${user.name} spent ${user?.customAttributes?.spentGrams || 0} grams`}
      </div>

      <div
        style={{
          position: "absolute",
          top: "200",
          right: "10px",
          border: "1px solid green",
          padding: "5px",
          backgroundColor: "lightgreen",
        }}
      >
        {user &&
          `${user.name} has total (${
            user?.customAttributes?.spentGrams +
            (user?.customAttributes?.grams || 0)
          } grams)`}
      </div>

      <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
        {data.items.map((item) => (
          <Link key={item.id} href={`/products/${item.id}`} passHref>
            <div
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #ccc",
                padding: "10px",
                minWidth: "300px",
                cursor: "pointer",
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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
