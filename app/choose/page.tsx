"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";
import { Card, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";

import printModelImage from "../../pictures/pngtree-3d-printer-manufacturing-isolated-on-white-background-png-image_4821024.png";
import recycleBottleImage from "../../pictures/watercolor-illustration-of-a-green-recycle-sign-and-a-plastic-bottle-reuse-symbol-for-ecological-design-wasteless-lifestyle-isolated-drawn-by-hand-png.png";
import { useEffect } from "react";
import Footer from "../_components/Footer";

export default function Choose() {
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

  const tooltipStyles = {
    backgroundColor: "#d7ffb1",
    color: "black",
    maxWidth: "500px",
    marginTop: "10px",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "14px", // Reduced font size
    fontFamily: "Roboto, sans-serif",
  };

  const printModelTooltip = (
    <Tooltip
      id="printModelTooltip"
      style={{ ...tooltipStyles, maxWidth: "500px" }}
    >
      Select a model for 3D printing using your earned points.
    </Tooltip>
  );

  const recycleBottleTooltip = (
    <Tooltip
      id="recycleBottleTooltip"
      style={{ ...tooltipStyles, maxWidth: "600px" }}
    >
      Recycle plastic bottles into a filament for printing.
    </Tooltip>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row", // Arrange cards horizontally
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          paddingRight: "20px", // Add padding to move the pictures to the right
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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* Print a 3D model card */}
          <OverlayTrigger
            placement="top"
            overlay={printModelTooltip}
            style={{ backgroundColor: "green" }}
          >
            <Link href={`/`} passHref>
              <Card
                style={{
                  width: "25rem", // Increase card width
                  margin: "10px",
                  textAlign: "center", // Center the content
                  marginBottom: "100px", // Push the card up a bit
                  transition: "transform 0.3s", // Add transition for transform
                  position: "relative", // Ensure proper positioning for tooltip
                }}
              >
                <Card.Img
                  variant="top"
                  src={printModelImage.src}
                  alt="Print Model Image"
                  style={{
                    height: "300px",
                    transition: "transform 0.3s",
                    marginLeft: "30px", // Move the picture to the right
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Card.Text>Print a 3D model</Card.Text>
                  <Link href={`/`} passHref></Link>
                </Card.Body>
              </Card>
            </Link>
          </OverlayTrigger>

          {/* Recycle a bottle card */}
          <OverlayTrigger
            placement="top"
            overlay={recycleBottleTooltip}
            style={{ backgroundColor: "green" }}
          >
            <Link href={`/recycle`} passHref>
              <Card
                style={{
                  width: "25rem", // Increase card width
                  margin: "10px",
                  textAlign: "center", // Center the content
                  marginBottom: "150px", // Push the card up a bit
                  transition: "transform 0.3s", // Add transition for transform
                  position: "relative", // Ensure proper positioning for tooltip
                }}
              >
                <Card.Img
                  variant="top"
                  src={recycleBottleImage.src}
                  alt="Recycle Bottle Image"
                  style={{
                    transition: "transform 0.3s",
                    height: "300px",
                    marginLeft: "30px", // Move the picture to the right
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.3)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Card.Text>Recycle a bottle</Card.Text>
                  <Link href={`/recycle`} passHref></Link>
                </Card.Body>
              </Card>
            </Link>
          </OverlayTrigger>
        </div>
      </div>
      <Footer />
    </div>
  );
}
