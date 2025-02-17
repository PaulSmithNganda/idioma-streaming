"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useDecodeUser } from "../hooks/useDecodeUser";
import { User } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialName } from "../helpers";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";
import { Loader } from "lucide-react";

const CardUser = () => {
  const { isLogged, isGetIdMeet } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("user");
  const meetid = searchParams.get("meetid");

  const user: User = useDecodeUser(token as string);

  if (!token) {
    return <div>{"Nous n'arrivons pas à vous identifier"}</div>;
  }

  const handleSignin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/meeting`);
      isLogged({ token: token, refresh_token: token });
      isGetIdMeet({ id: meetid as string });
    }, 3000);
  };

  return (
    <Card className="w-1/3 p-10 flex flex-col gap-4 justify-center items-center">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user.teacher_profile as string} alt={user.fullname} />
        <AvatarFallback>{getInitialName(user.fullname)}</AvatarFallback>
      </Avatar>
      <h2 className="font-semibold text-xl">{user.fullname}</h2>
      <p className="text-center text-sm">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, impedit
        quod nemo atque, odit ratione porro ducimus dolores quisquam, velit
        eaque fugit libero provident dolorem. Nobis quod rerum natus minima!
      </p>
      <Button onClick={handleSignin}>
        {loading ? <Loader className="animate-spin" /> : "Confirmer"}
      </Button>
    </Card>
  );
};

export default CardUser;
