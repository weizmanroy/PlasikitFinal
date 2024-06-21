"use client";
import React from "react";
import Image from "next/image";
import aboutImage from "/pictures/200w.gif";
import { Box, Typography, Paper } from "@mui/material";
import Footer from "../_components/Footer";

export default function About() {
  return (
    <div>
      <Box
        sx={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            marginBottom: "30px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "#64AD62",
          }}
        >
          About Plastikit
        </Typography>
        <Box
          sx={{
            width: 150,
            height: 150,
            margin: "0 auto 20px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src={aboutImage}
            alt="Plastikit Project"
            layout="responsive"
            width={150}
            height={150}
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            textAlign: "justify",
            lineHeight: "1.6",
          }}
        >
          <Typography paragraph sx={{ fontWeight: "bold" }}>
            The Plastikit project is an innovative initiative in the fields of
            engineering and sustainability, combining recycling technologies and
            3D printing to create functional products from recycled plastic
            bottles. Managed by software engineering students from Shenkar under
            the guidance of Dr. Michal Chalamish, the project is carried out in
            collaboration with schools in Ramat Gan.
          </Typography>
          <Typography paragraph>
            The project&apos;s goal is to promote environmental awareness and
            encourage active participation of students in recycling, while
            creating high-quality and sustainable products from recycled
            plastic. The system includes two main components:
          </Typography>
          <Typography component="ul">
            <li>
              Hardware - A machine for preparing printing filaments from plastic
              bottles.
            </li>
            <li>
              Software - An application dashboard that allows users to recycle,
              manage user accounts, and perform 3D printing operations.
            </li>
          </Typography>
          <Typography paragraph>
            The system combines embedded software with application software,
            enabling real-time management and analysis of recycling and printing
            processes. The embedded software manages the hardware activities,
            such as cutting plastic bottles and preparing them for printing,
            while ensuring data communication between the two types of software.
            The application software includes a dashboard that provides users
            with tools for managing the recycling operation, calculating points
            (grams) for users, and selecting 3D printing models.
          </Typography>
          <Typography variant="h6" component="h2" sx={{ marginTop: "20px" }}>
            Main Objectives:
          </Typography>
          <Typography component="ul">
            <li>
              Environmental Sustainability: Reducing environmental impact by
              reusing plastic waste.
            </li>
            <li>
              Education and Awareness: Collaborating with schools to raise
              environmental awareness among children.
            </li>
            <li>
              Technological Innovation: Combining recycling technologies and 3D
              printing to create advanced products from recycled plastic.
            </li>
            <li>
              Encouraging Recycling Among Students: Fostering a culture of
              recycling and cooperation among students through recycling
              competitions and educational activities.
            </li>
          </Typography>
          <Typography paragraph>
            The project presents a comprehensive solution that combines hardware
            and software for an important environmental goal, emphasizing
            technological education and social involvement.
          </Typography>
        </Paper>
      </Box>

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
      <Footer />
    </div>
  );
}
