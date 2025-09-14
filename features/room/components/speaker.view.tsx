"use client";

import React, { useState } from "react";

import {
  CallControls,
  CallParticipantsList,
  //   CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  //   useCall,
  //   ParticipantView,
  //   hasScreenShare,
  //   DefaultParticipantViewUI,
} from "@stream-io/video-react-sdk";
// import { useStreamCall } from "../hooks/useStreamCall";
import Image from "next/image";
import Loading from "./loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// type BlurLevel = "none" | "low" | "medium" | "high" | "disable";
type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const SpeakerView = () => {
  //   const call = useStreamCall();
  //   const { useParticipants } = useCallStateHooks();
  //   const [participantInSpotlight, ...outherParticipants] = useParticipants();

  //   const [showMeetingInfo, setshowMeetingInfo] = useState(false);
  //   const [showMeetingAlert, setshowMeetingAlert] = useState(false);
  //   const [meetingUrl, setmeetingUrl] = useState("");
  //   const [open, setopen] = useState(false);
  //   const [blurLevelState, setblurLevelState] = useState<BlurLevel>("none");

  //   const isOneToOneCall = outherParticipants.length === 1;

  //   useEffect(() => {
  //     setmeetingUrl(window.location.href);
  //   }, []);

  const router = useRouter();
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");

  const [showParticipants, setshowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED)
    return <Loading title="Entrain de rejoindre l'appel" />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden p-4 text-white bg-black">
      {/* {isOneToOneCall ? (
        <div className="flex-1 flex flex-col lg:flex-row ap-4">
          <div className="flex-1 flex items-center justify-center">
            <ParticipantView
              participant={participantInSpotlight}
              trackType={
                hasScreenShare(participantInSpotlight)
                  ? "screenShareTrack"
                  : "videoTrack"
              }
              ParticipantViewUI={DefaultParticipantViewUI}
            />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ParticipantView
              participant={outherParticipants[0]}
              trackType={
                hasScreenShare(outherParticipants[0])
                  ? "screenShareTrack"
                  : "videoTrack"
              }
              ParticipantViewUI={DefaultParticipantViewUI}
            />
          </div>
        </div>
      ) : (
        <>
          {outherParticipants.length > 1 && (
            <div className="flex  flex-row items-center gap-2.5 h-48 min-h-44 overflow-x-auto .scrollbar-hide">
              {outherParticipants.map((participant) => (
                <div
                  className="w-60 min-w-[240px] first:ml-auto last:mr-auto "
                  key={participant.sessionId}>
                  <ParticipantView
                    participant={participant}
                    ParticipantViewUI={DefaultParticipantViewUI}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="flex-1 flex items-center justify-center min-h-0 mt-4">
            {call && (
              <ParticipantView
                participant={participantInSpotlight}
                trackType={
                  hasScreenShare(participantInSpotlight)
                    ? "screenShareTrack"
                    : "videoTrack"
                }
                ParticipantViewUI={DefaultParticipantViewUI}
              />
            )}
          </div>
        </>
      )} */}
      <div className="absolute top-10 left-10 flex items-center gap-2 z-10">
        <Image
          src={"/images/logo-principal.png"}
          alt="logo"
          width={150}
          height={100}
          className="w-[100px] md:w-[120px]"
        />
        <div className="w-6 h-6 flex justify-center items-center bg-red-600/60 cursor-pointer rounded-full  flash">
          <div className="w-3 h-3 rounded-full bg-red-500" />
        </div>
      </div>
      <div className="flex items-center justify-center relative size-full">
        <div className="flex items-center size-full relative max-w-[1000px]">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}>
          <CallParticipantsList onClose={() => setshowParticipants(false)} />
        </div>
        <div className="flex fixed bottom-2 w-full justify-center items-center gap-5 flex-wrap">
          <CallControls
            onLeave={() =>
              router.push("https://tutor.idioma.international/sessions")
            }
          />
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                <LayoutList className="text-white" size={20} />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, i) => (
                <div key={i}>
                  <DropdownMenuItem
                    onClick={() => {
                      setlayout(item.toLocaleLowerCase() as CallLayoutType);
                    }}
                    className="cursor-pointer">
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-dark-1" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <CallStatsButton /> */}
          {/* <button onClick={() => setshowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-full bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white" />
            </div>
          </button> */}
          {/* {!isPersonalRoom && <EndCallButton />} */}
          {/* <EndCallButton /> */}
        </div>
      </div>
    </section>
  );
};

export default SpeakerView;
