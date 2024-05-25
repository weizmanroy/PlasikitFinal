// Wrap the parent component with the `use client` pragma
"use client";

import React from "react";
import { Card } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import plastikitImage from "../../pictures/200w.gif";
import Footer from "../_components/Footer";

export default function About() {
  return (
    <div>
      <div
        className="container"
        style={{
          padding: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#4a4a4a",
          }}
        >
          About Plastikit
        </h1>

        <Card
          style={{
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            border: "none",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Image
              src={plastikitImage}
              alt="Plastikit Logo"
              width={150}
              height={150}
              style={{ borderRadius: "50%" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                color: "#3a3a3a",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Our Mission
            </h2>
            <p
              style={{ color: "#5a5a5a", fontSize: "18px", lineHeight: "1.6" }}
            >
              Plastikit is dedicated to promoting sustainable practices by
              transforming plastic waste into usable 3D printing filament. Our
              mission is to reduce plastic pollution and provide a viable
              recycling solution that benefits both individuals and the
              environment.
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                color: "#3a3a3a",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              How It Works
            </h2>
            <p
              style={{ color: "#5a5a5a", fontSize: "18px", lineHeight: "1.6" }}
            >
              At Plastikit, we make it easy for you to recycle your plastic
              bottles. Simply collect your plastic waste, bring it to one of our
              recycling centers, and watch as it gets transformed into
              high-quality filament for 3D printing. You can use the points you
              earn from recycling to print various models from our library.
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                color: "#3a3a3a",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Our Impact
            </h2>
            <p
              style={{ color: "#5a5a5a", fontSize: "18px", lineHeight: "1.6" }}
            >
              Since our inception, Plastikit has recycled thousands of plastic
              bottles, turning them into useful products and keeping them out of
              landfills and oceans. Our community-driven approach not only
              promotes recycling but also encourages innovation and creativity
              through 3D printing.
            </p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                color: "#3a3a3a",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Join Us
            </h2>
            <p
              style={{ color: "#5a5a5a", fontSize: "18px", lineHeight: "1.6" }}
            >
              We invite you to join our community of eco-conscious individuals
              who are making a difference. Whether you’re looking to recycle
              plastic or create something new with 3D printing, Plastikit is
              here to support you every step of the way.
            </p>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
