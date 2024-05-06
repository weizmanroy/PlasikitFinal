"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";

// Import your images
import printModelImage from "../../pictures/pngtree-3d-printer-manufacturing-isolated-on-white-background-png-image_4821024.png";
import recycleBottleImage from "../../pictures/watercolor-illustration-of-a-green-recycle-sign-and-a-plastic-bottle-reuse-symbol-for-ecological-design-wasteless-lifestyle-isolated-drawn-by-hand-png.png";

export default function Choose() {
  const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const sdk = useDescope();

  const handleLogout = () => {
    sdk.logout();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", // Arrange cards horizontally
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
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
          transition: "background-color 0.3s", // Add transition for background-color
          fontSize: "16px",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "manipulation",
          color: "white",
        }}
      >
        Logout
      </button>

      {/* Print a 3D model card */}
      <Link href={`/`} passHref>
        <Card
          style={{
            width: "25rem", // Increase card width
            margin: "10px",
            textAlign: "center", // Center the content
            marginBottom: "150px", // Push the card up a bit
            transition: "transform 0.3s", // Add transition for transform
          }}
        >
          <Card.Img
            variant="top"
            src={printModelImage.src}
            alt="Print Model Image"
            style={{ height: "390px" }}
          />
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Link href={`/`} passHref>
              <Button
                variant="primary"
                style={{
                  fontSize: "24px",
                  fontFamily: "Rubik",
                  transition: "transform 0.3s", // Add transition for transform
                }}
              >
                Print a 3D model
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Link>

      {/* Recycle a bottle card */}
      <Link href={`/recycle`} passHref>
        <Card
          style={{
            width: "25rem", // Increase card width
            margin: "10px",
            textAlign: "center", // Center the content
            marginBottom: "150px", // Push the card up a bit
            transition: "transform 0.3s", // Add transition for transform
          }}
        >
          <Card.Img
            variant="top"
            src={recycleBottleImage.src}
            alt="Recycle Bottle Image"
          />
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Link href={`/recycle`} passHref>
              <Button
                variant="primary"
                style={{
                  fontSize: "24px",
                  fontFamily: "Rubik",
                  transition: "transform 0.3s", // Add transition for transform
                }}
              >
                Recycle a bottle
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}
