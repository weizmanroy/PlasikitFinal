// Wrap the parent component with the `use client` pragma
"use client";

import { UserProfile } from "@descope/nextjs-sdk";
import Footer from "../_components/Footer";

export default function Profile() {
  return (
    <div>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <UserProfile
            widgetId="user-profile-widget"
            theme="light" // light / dark / os (auto detect)
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "140vh",
    backgroundColor: "#f0f2f5",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    width: "100%",
  },
};
