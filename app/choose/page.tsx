"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import printModelImage from "../../pictures/pngtree-3d-printer-manufacturing-isolated-on-white-background-png-image_4821024.png";
import recycleBottleImage from "../../pictures/watercolor-illustration-of-a-green-recycle-sign-and-a-plastic-bottle-reuse-symbol-for-ecological-design-wasteless-lifestyle-isolated-drawn-by-hand-png.png";

export default function Choose() {
  const { isAuthenticated, isSessionLoading, sessionToken } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const sdk = useDescope();

  const handleLogout = () => {
    sdk.logout();
    router.push("/sign-in");
  };

  const printModelTooltip = (
    <Tooltip
      id="printModelTooltip"
      style={{
        backgroundColor: "#d7ffb1",
        color: "black",
        maxWidth: "500px",
        marginTop: "10px", // Add space from the top
      }}
    >
      On this page, you have the opportunity to select a model for printing. By
      recycling bottles and converting them into a reel usable by the printer,
      you've earned points that can be redeemed for printing. Now, you can
      utilize these points to print 3D models from the plastikit library.
    </Tooltip>
  );

  const recycleBottleTooltip = (
    <Tooltip
      id="recycleBottleTooltip"
      style={{
        backgroundColor: "#d7ffb1",
        color: "black",
        maxWidth: "600px",
        marginTop: "10px", // Add space from the top
      }}
    >
      In this window, you can recycle a plastic bottle by transforming it into a
      coil for printing. Upon completing the recycling process, you will earn
      points directly to your account, which you can later redeem for printing.
    </Tooltip>
  );

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

      <Link href={`/sign-in`} passHref>
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
      </Link>

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
              marginBottom: "150px", // Push the card up a bit
              transition: "transform 0.3s", // Add transition for transform
              position: "relative", // Ensure proper positioning for tooltip
            }}
          >
            <Link href={`/`} passHref>
              <Card.Img
                variant="top"
                src={printModelImage.src}
                alt="Print Model Image"
                style={{ height: "390px", transition: "transform 0.3s" }} // Add transition for transform
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.3)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Link>
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
                    fontFamily: "light 300",
                    transition: "transform 0.3s", // Add transition for transform
                  }}
                >
                  Print a 3D model
                </Button>
              </Link>
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
            <Link href={`/recycle`} passHref>
              <Card.Img
                variant="top"
                src={recycleBottleImage.src}
                alt="Recycle Bottle Image"
                style={{ transition: "transform 0.3s", height: "390px" }} // Add transition for transform
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.3)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Link>
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
                    fontFamily: "light 300",
                    transition: "transform 0.3s", // Add transition for transform
                  }}
                >
                  Recycle a bottle
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Link>
      </OverlayTrigger>
    </div>
  );
}
