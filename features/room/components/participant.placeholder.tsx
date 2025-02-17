"use client";

import { useAuthStore } from "@/store/store";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
} from "@stream-io/video-react-sdk";
import { redirect } from "next/navigation";
import React from "react";

const ParticipantPlaceholder = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) redirect("/");
  return (
    <DefaultVideoPlaceholder
      participant={
        {
          image: user?.profile,
          name: user?.fullname,
        } as StreamVideoParticipant
      }
    />
  );
};

export default ParticipantPlaceholder;
