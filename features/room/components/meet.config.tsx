"use client";

import { useState } from "react";
import Loading from "@/features/room/components/loading";
import MeetSetup from "@/features/room/components/meet.setup";
import Unauthorized from "@/features/room/components/unauthorized";
import { useGetCall } from "@/features/room/hooks/useGetCall";
import {
  BackgroundFiltersProvider,
  StreamCall,
  StreamTheme,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import MeetRoom from "@/features/room/components/meet.room";
import { images } from "@/features/room/lib/utils";

const MeetConfig = ({ slug }: { slug: string }) => {
  const { isLoading, call } = useGetCall({ id: slug });

  const [isSetupComplete, setisSetupComplete] = useState(false);

  if (isLoading) return <Loading title="Configuration pour ta séance..." />;
  if (!call) return <Unauthorized />;

  return (
    <StreamCall call={call}>
      <StreamTheme className="w-full h-full">
        {!isSetupComplete ? (
          <MeetSetup setisSetupComplete={setisSetupComplete} />
        ) : (
          <BackgroundFiltersProvider
            backgroundBlurLevel={undefined}
            backgroundImages={images}>
            <MeetRoom />
          </BackgroundFiltersProvider>
        )}
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetConfig;
