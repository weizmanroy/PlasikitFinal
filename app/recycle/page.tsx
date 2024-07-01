"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import BuildIcon from "@mui/icons-material/Build";
import BalanceIcon from "@mui/icons-material/Balance";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";
import { useDescope, useSession, useUser } from "@descope/nextjs-sdk/client";
import mqtt from "mqtt"; // Import the MQTT library
import Image from "next/image";
import gifImage from "../../pictures/6ob.gif"; // Import the GIF
import Footer from "../_components/Footer";
import MQTTPage from "../_components/mqtt";

const iconSize = "40px";

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const flyToUser = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, -100px); 
  }
`;

const BlinkingPlayArrowIcon = styled(PlayArrowIcon)`
  animation: ${blink} 1s infinite;
  font-size: ${iconSize};
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

const BlinkingLinearScaleIcon = styled(LinearScaleIcon)`
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
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

const LargeLinearScaleIcon = styled(LinearScaleIcon)`
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

const RedBackgroundThermostatIcon = styled(ThermostatIcon)`
  font-size: ${iconSize};
  background-color: red;
  border-radius: 50%;
  padding: 5px;
`;

const FlyingGrams = styled("div")`
  position: absolute;
  animation: ${flyToUser} 2s forwards;
`;

const StyledTimelineContent = styled(TimelineContent)`
  & .MuiTypography-root {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    color: #333;
  }
  & .MuiTypography-h6 {
    font-size: 1.25rem;
    color: #1976d2;
    margin-bottom: 8px;
  }
  & .MuiTypography-body1 {
    font-size: 1rem;
    color: #555;
  }
`;

const StyledTotalGrams = styled("div")`
  margin-top: 50px;
  padding: 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export default function Recycle() {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();
  const { user } = useUser();
  const sdk = useDescope();

  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [weightMessage, setWeightMessage] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [engineStarted, setEngineStarted] = useState<boolean>(false);
  const [showGif, setShowGif] = useState<boolean>(false);
  const [isTempBlinking, setIsTempBlinking] = useState<boolean>(false);
  const [isScaling, setIsScaling] = useState<boolean>(false);
  const [isStartConfirmationReceived, setIsStartConfirmationReceived] =
    useState<boolean>(false);
  const [flyingGrams, setFlyingGrams] = useState<number | null>(null);
  const [totalGrams, setTotalGrams] = useState<number>(
    user?.customAttributes?.grams || 0
  );

  const [isEngineStartingFlag, setIsEngineStartingFlag] =
    useState<boolean>(false);

  const gramsPositionRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<mqtt.MqttClient | null>(null);

  useEffect(() => {
    if (!isAuthenticated && !isSessionLoading) {
      router.push("/sign-in");
    }
  }, [isSessionLoading, isAuthenticated, router]);

  useEffect(() => {
    if (showGif) {
      const timer = setTimeout(() => setShowGif(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showGif]);

  useEffect(() => {
    if (flyingGrams !== null) {
      const timer = setTimeout(() => {
        setTotalGrams((prevGrams) => prevGrams + flyingGrams);
        setFlyingGrams(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flyingGrams]);

  useEffect(() => {
    if (weightMessage && showGif) {
      const timer = setTimeout(() => {
        router.push("/choose");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [weightMessage, showGif, router]);

  useEffect(() => {
    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe("plastikit/status", (err) => {
        if (err) {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("message", (topic, message) => {
      handleMessageReceived(message.toString());
    });

    clientRef.current = client;

    return () => {
      client.end();
    };
  }, []);

  const handleLogout = () => {
    sdk.logout();
    router.push("/sign-in");
  };

  const handleMessageReceived = (message: string) => {
    console.log("Message received:", message);
    setLastMessage(message);

    if (message.startsWith("temp:")) {
      const temp = parseInt(message.split(":")[1], 10);
      setTemperature(temp);
      setIsScaling(false);
      setIsStartConfirmationReceived(false);
      if (!isEngineStartingFlag) {
        setIsTempBlinking(true);
      }
    } else if (message === "Start_confirmation_recieved") {
      setIsStartConfirmationReceived(true);
      setIsTempBlinking(false);
      setEngineStarted(false);
      setIsScaling(false);
    } else if (message === "engine_starting") {
      setEngineStarted(true);
      setIsTempBlinking(false);
      setIsScaling(false);
      setIsEngineStartingFlag(true);
    } else if (message === "scaling") {
      setIsScaling(true);
      setIsTempBlinking(false);
      setEngineStarted(false);
      setWeightMessage(null);
      setIsStartConfirmationReceived(false);
    } else if (message.endsWith("gr")) {
      setWeightMessage(message);
      setShowGif(true);

      const grams = parseInt(message.replace("gr", ""));
      const userId = user?.userId;

      if (userId) {
        fetch("/api/update-grams", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ grams, userId }),
        });
      }

      setFlyingGrams(grams);
    } else {
      console.warn("Unhandled message type:", message);
    }
  };

  const handlePlayClick = () => {
    setLastMessage(null);
    setWeightMessage(null);
    setTemperature(null);
    setEngineStarted(false);
    setIsTempBlinking(false);
    setShowGif(false);
    setIsScaling(false);
    setIsStartConfirmationReceived(false);
    setIsEngineStartingFlag(false);

    const client = clientRef.current;
    if (client && client.connected) {
      client.publish("plastikit/status", ".", (err) => {
        if (err) {
          console.error("Publish error:", err);
        } else {
          console.log("Message published: .");
        }
      });

      client.publish("plastikit/status", "Start_confirmation", (err) => {
        if (err) {
          console.error("Publish error:", err);
        } else {
          console.log("Message published: Start_confirmation");
        }
      });
    } else {
      console.error("Client not connected");
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 240) return "red";
    if (temp >= 200) return "orange";
    if (temp >= 150) return "yellow";
    return "green";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        position: "relative",
      }}
    >
      {showGif && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <Image src={gifImage} alt="Fireworks" width={500} height={300} />
        </div>
      )}
      {flyingGrams !== null && (
        <FlyingGrams
          style={{
            top: gramsPositionRef.current
              ? gramsPositionRef.current.getBoundingClientRect().top - 100
              : 0,
            left: gramsPositionRef.current?.getBoundingClientRect().left || 0,
          }}
        >
          <Typography variant="h6" component="div">
            +{flyingGrams} gr
          </Typography>
        </FlyingGrams>
      )}
      <div>
        <button
          onClick={() => (window.location.href = "/choose")}
          type="button"
          className="fixed top-32 left-5 flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
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
          <MQTTPage onMessageReceived={handleMessageReceived} />
        </div>
      </div>

      <Timeline
        position="alternate"
        style={{ marginTop: "20px", width: "80%" }}
      >
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              {!isStartConfirmationReceived &&
              !isTempBlinking &&
              !engineStarted &&
              !isScaling &&
              !weightMessage ? (
                <BlinkingPlayArrowIcon onClick={handlePlayClick} />
              ) : (
                <LargePlayArrowIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <StyledTimelineContent>
            <Typography variant="h6" component="span">
              Start Procedure
            </Typography>
            <Typography>
              Press the start button to begin the procedure
            </Typography>
          </StyledTimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              {isStartConfirmationReceived &&
              !isTempBlinking &&
              !engineStarted &&
              !isScaling &&
              !weightMessage ? (
                <BlinkingLinearScaleIcon />
              ) : (
                <LargeLinearScaleIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <StyledTimelineContent>
            <Typography variant="h6" component="span">
              Place the Filament and Press the Blue Button to Start
            </Typography>
          </StyledTimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              style={{
                backgroundColor:
                  temperature && temperature > 100 ? "red" : undefined,
              }}
            >
              {isTempBlinking &&
              !engineStarted &&
              !isScaling &&
              !weightMessage ? (
                <BlinkingThermostatIcon />
              ) : (
                <LargeThermostatIcon />
              )}
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <StyledTimelineContent>
            <Typography variant="h6" component="span">
              Heating Up, The temperature is:
            </Typography>
            <Typography
              style={{
                color: temperature
                  ? getTemperatureColor(temperature)
                  : "inherit",
              }}
            >
              {temperature ? `${temperature} °C` : "Waiting for temperature..."}
            </Typography>
            <Typography>
              When the temperature is reached, the engine will start
            </Typography>
          </StyledTimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="primary">
              {engineStarted && !isScaling && !weightMessage ? (
                <BlinkingBuildIcon />
              ) : (
                <LargeBuildIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <StyledTimelineContent>
            {engineStarted ? (
              <>
                <Typography variant="h6" component="span">
                  The engine has been started
                </Typography>
                <Typography>
                  It is transforming into a filament, long press the blue button
                  to stop
                </Typography>
              </>
            ) : (
              <Typography variant="h6" component="span">
                Start Engine
              </Typography>
            )}
          </StyledTimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary">
              {isScaling || lastMessage?.endsWith("gr") ? (
                <BlinkingBalanceIcon />
              ) : (
                <LargeBalanceIcon />
              )}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <StyledTimelineContent>
            <Typography variant="h6" component="span">
              Weigh Your Filament
            </Typography>
            <Typography>
              {isScaling
                ? "Press the yellow button to weigh"
                : weightMessage
                ? `Congrats! ${weightMessage} was added to your account.`
                : "No weight message received."}
            </Typography>
          </StyledTimelineContent>
        </TimelineItem>
      </Timeline>
      <StyledTotalGrams ref={gramsPositionRef}>
        You have: <strong>{totalGrams}</strong> grams
      </StyledTotalGrams>
      <Footer />
    </div>
  );
}
