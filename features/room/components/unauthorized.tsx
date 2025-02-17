"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="w-ful min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 justify-center items-center text-center p-8">
        <AlertTriangle className="size-16 text-yellow-500" />
        <h2 className="text-2xl font-semibold ">Pas autorisé !</h2>
        <p className="text-gray-400">
          Veuillez bien verifier si vous avez le lien correct pour votre séance
          !
        </p>
        <Button variant={"secondary"}>
          <Link href={"https://idioma.vercel.com"}>Retourner sur Idioma</Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
