"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KitchenIcon from "@mui/icons-material/Kitchen";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import BuildIcon from "@mui/icons-material/Build";
import BalanceIcon from "@mui/icons-material/Balance";
import Typography from "@mui/material/Typography";
import MQTTPage from "../mqtt/page";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import Footer from "../_components/Footer";

const iconSize = "40px";

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const BlinkingPlayArrowIcon = styled(PlayArrowIcon)`
  animation: ${blink} 1s infinite;
  font-size: ${iconSize};
`;

const BlinkingKitchenIcon = styled(KitchenIcon)`
  animation: ${blink} 1s infinite;
  font-size: ${iconSize};
`;

const BlinkingSettingsInputComponentIcon = styled(SettingsInputComponentIcon)`
  animation: ${blink} 1s infinite;
  font-size: ${iconSize};
`;

const BlinkingThermostatIcon = styled(ThermostatIcon)`
  animation: ${blink} 1s infinite;
  font-size: ${iconSize};
`;

const BlinkingBuildIcon = styled(BuildIcon)`
  animation: ${blink} 1s infinite;
  font-size: ${iconSize};
`;

const BlinkingBalanceIcon = styled(BalanceIcon)`
  animation: ${blink} 1s infinite;
  font-size: ${iconSize};
`;

const LargePlayArrowIcon = styled(PlayArrowIcon)`
  font-size: ${iconSize};
`;

const LargeKitchenIcon = styled(KitchenIcon)`
  font-size: ${iconSize};
`;

const LargeSettingsInputComponentIcon = styled(SettingsInputComponentIcon)`
  font-size: ${iconSize};
`;

const LargeThermostatIcon = styled(ThermostatIcon)`
  font-size: ${iconSize};
`;

const LargeBuildIcon = styled(BuildIcon)`
  font-size: ${iconSize};
`;

const LargeBalanceIcon = styled(BalanceIcon)`
  font-size: ${iconSize};
`;

interface ChooseProps {
  mqttMessages: string[]; // Define the type of mqttMessages prop
}

export default function Choose({ mqttMessages }: ChooseProps) {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const sdk = useDescope();

  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [weightMessage, setWeightMessage] = useState<string | null>(null);

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

  const handleMessageReceived = (message: string) => {
    setLastMessage(message);
    if (message.endsWith("g")) {
      setWeightMessage(message);

      const grams = parseInt(message.replace("g", ""));
      const userId = user?.userId;

      if (userId) {
        // Send the grams to the backend
        fetch("/api/update-grams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ grams, userId }),
        });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
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
      <div>
        <MQTTPage onMessageReceived={handleMessageReceived} userId={""} />
      </div>

      <Timeline position="alternate" style={{ marginTop: "550px" }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              {lastMessage === "1" ? (
                <BlinkingPlayArrowIcon />
              ) : (
                <LargePlayArrowIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Start Procedure
            </Typography>
            <Typography>
              Press the start button to begin the procedure.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              {lastMessage === "2" ? (
                <BlinkingKitchenIcon />
              ) : (
                <LargeKitchenIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Cut Bottle's Head
            </Typography>
            <Typography>Remove the head of the bottle.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              {lastMessage === "3" ? (
                <BlinkingSettingsInputComponentIcon />
              ) : (
                <LargeSettingsInputComponentIcon />
              )}
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Connect the Bottle
            </Typography>
            <Typography>Connect the bottle to the machine.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary">
              {lastMessage === "4" ? (
                <BlinkingThermostatIcon />
              ) : (
                <LargeThermostatIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Ensure Temperature is 240 Degrees
            </Typography>
            <Typography>
              Check the machine's temperature and ensure it is set to 240
              degrees.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              {lastMessage === "5" ? <BlinkingBuildIcon /> : <LargeBuildIcon />}
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Start Engine
            </Typography>
            <Typography>Press the button to start the engine.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary">
              {lastMessage === "6" ? (
                <BlinkingBalanceIcon />
              ) : (
                <LargeBalanceIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Weigh Your Coil
            </Typography>
            <Typography>
              {weightMessage
                ? `Congrats! ${weightMessage} was added to your account.`
                : "No weight message received."}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      <iframe
        className="w-full aspect-video self-stretch md:min-h-96"
        src="https://www.youtube.com/embed/1FLYZdxsteo"
        frameBorder="0"
        title="Product Overview Video"
        aria-hidden="true"
      />
      <div>
        You have: <strong>{user?.customAttributes?.grams || 0}</strong>{" "}
      </div>
      <Footer />
    </div>
  );
}
