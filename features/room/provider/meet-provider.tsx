"use client";

import React from "react";

import { StreamVideo } from "@stream-io/video-react-sdk";
import { useMeet } from "../hooks/useMeet";
import { useAuthStore } from "@/store/store";

type Props = {
  children: React.ReactNode;
  // user: {
  //   id: number;
  //   name: string;
  //   image: string;
  // };
};

const MeetProvider = ({ children }: Props) => {
  const user2 = useAuthStore((state) => state.user);
  const { client } = useMeet({
    id: user2.id,
    name: user2.fullname,
    image: user2.teacher_profile,
  });

  if (!client) return null;

  return <StreamVideo client={client}>{children}</StreamVideo>;
};

export default MeetProvider;
