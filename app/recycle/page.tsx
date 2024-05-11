"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import KitchenIcon from "@mui/icons-material/Kitchen";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import Typography from "@mui/material/Typography";

export default function Choose() {
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

      <Timeline position="alternate" style={{ marginTop: "150px" }}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <KitchenIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Cutting bottle
            </Typography>
            <Typography>Turning the bottle into coil</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <TimelapseIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Weight the bottle after removing the head
            </Typography>
            <Typography>Because it's awesome!</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <SettingsInputComponentIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Connect the cutting bottle to the machine
            </Typography>
            <Typography>Because you need rest</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
            <TimelineDot color="secondary"></TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              Start making coil
            </Typography>
            <Typography>Because this is the life you love!</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      <Link href={`/sign-in`} passHref>
        <button
          style={{
            border: "2px solid green",
            backgroundColor: "lightgreen",
            padding: "20px",
            margin: "10px",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          Recycle a bottle
        </button>
      </Link>

      <iframe
        className="w-full aspect-video self-stretch md:min-h-96"
        src="https://www.youtube.com/embed/1FLYZdxsteo"
        frameBorder="0"
        title="Product Overview Video"
        aria-hidden="true"
      />
    </div>
  );
}
