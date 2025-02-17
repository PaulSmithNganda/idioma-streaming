"use client";

import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import Loading from "./loading";
import SpeakerView from "./speaker.view";

const MeetRoom = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loading title="Entrain de rejoindre" />;
  }

  return <SpeakerView />;
};

export default MeetRoom;
