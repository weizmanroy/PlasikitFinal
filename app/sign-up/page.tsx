"use client";
import { useRouter } from "next/navigation";
import { Descope } from "@descope/nextjs-sdk";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const onsucess = () => {
    router.push("/");
  };
  return (
    <div>
      <Descope flowId="sign-up" onSuccess={onsucess} />
      <Link href={`/sign-in`} passHref>
        <div> Sign in</div>
      </Link>
    </div>
  );
}
