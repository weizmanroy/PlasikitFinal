"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const onSuccess = () => {
    router.push("/choose");
  };
  return (
    <div style={{ width: "40%", margin: "0 auto" }}>
      <Descope flowId="sign-in" onSuccess={onSuccess} />
      <Link href={`/sign-up`} passHref>
        <button
          style={{
            alignItems: "center",
            appearance: "button",
            backgroundColor: "#006af4",
            borderRadius: "8px",
            borderStyle: "none",
            boxShadow: "rgba(255, 255, 255, 0.26) 0 1px 2px inset",
            boxSizing: "border-box",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            flexShrink: 0,
            fontFamily: "'RM Neue', sans-serif",
            fontSize: "100%",
            lineHeight: "1.15",
            margin: "20px",
            padding: "10px 21px",
            textAlign: "center",
            textTransform: "none",
            transition:
              "color .13s ease-in-out, background .13s ease-in-out, opacity .13s ease-in-out, box-shadow .13s ease-in-out",
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "manipulation",
          }}
          role="button"
        >
          Sign up
        </button>
      </Link>
    </div>
  );
}
