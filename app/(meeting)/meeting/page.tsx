"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";
import Link from "next/link";

export default function Page() {
  const meetid = useAuthStore((state) => state.meetid);
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-6">
      Page Meeting
      <Button>
        <Link href={`/meeting/${meetid}`}>Accerder à votre meeting</Link>
      </Button>
    </div>
  );
}
