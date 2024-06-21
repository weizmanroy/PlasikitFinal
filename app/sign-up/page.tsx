"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const onsucess = (e: { detail: { user: any } }) => {
    const user = e.detail.user;
    console.log("@@@user", user);
    fetch("/api/update-user-after-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    router.push("/choose");
  };
  return (
    <div style={{ width: "40%", margin: "0 auto" }}>
      <Descope
        flowId="sign-up"
        onSuccess={onsucess}
        tenant="T2hh4ztHpempjoUv3a6gNaeF0xLY"
      />
      <Link href={`/sign-in`} passHref>
        <div> Sign in</div>
      </Link>
    </div>
  );
}
