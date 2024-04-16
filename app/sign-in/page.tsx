"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const onsucess = () => {
    router.push("/");
  };
  return (
    <div>
      <Descope flowId="sign-in" onSuccess={onsucess} />
      <Link href={`/sign-up`} passHref>
        <div> Sign up</div>
      </Link>
    </div>
  );
}
