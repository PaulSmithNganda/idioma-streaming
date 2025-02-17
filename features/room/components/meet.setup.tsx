"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/store";
import { Loader, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitialName } from "@/features/user/helpers";
import { Button } from "@/components/ui/button";
import ParticipantPlaceholder from "./participant.placeholder";
import RequestPermissionPlaceholder from "./request.permission";
import { useStreamCall } from "../hooks/useStreamCall";
// import { toast } from "sonner";

const MeetingSetup = ({
  setisSetupComplete,
}: {
  setisSetupComplete: (type: boolean) => void;
}) => {
  const user = useAuthStore((state) => state.user);
  const call = useStreamCall();
  const { useParticipantCount } = useCallStateHooks();

  const participantCount = useParticipantCount();

  //   const { useMicrophoneState, useCameraState, useParticipantCount } =
  //     useCallStateHooks();

  //   const microphoneState = useMicrophoneState();
  //   const cameraState = useCameraState();
  //   const participantCount = useParticipantCount();

  //   const [microphoneEnabled, setmicrophoneEnabled] = useState(
  //     microphoneState.isEnabled && microphoneState.hasBrowserPermission
  //   );

  //   const [cameraEnabled, setcameraEnabled] = useState(
  //     cameraState.isEnabled && cameraState.hasBrowserPermission
  //   );

  //   const requestMicrophonePermissions = async () => {
  //     try {
  //       await navigator.mediaDevices.getUserMedia({ audio: true });
  //       setmicrophoneEnabled(!microphoneEnabled);
  //     } catch (error) {
  //       toast.error(
  //         `Veuillez donner accès à votre micro afin de continuer votre séance ! ${error}`
  //       );
  //     }
  //   };

  //   const requestCameraPermissions = async () => {
  //     try {
  //       await navigator.mediaDevices.getUserMedia({ video: true });
  //       setcameraEnabled(!cameraEnabled);
  //     } catch (error) {
  //       toast.error(
  //         `Veuillez donner accès à votre caméra afin de continuer votre séance ! ${error}`
  //       );
  //     }
  //   };

  //   const toggleMicrophone = () => {
  //     if (!microphoneState.hasBrowserPermission) {
  //       if (microphoneEnabled) {
  //         call?.microphone.disable();
  //       } else {
  //         call?.microphone.enable();
  //       }
  //       setmicrophoneEnabled(!microphoneEnabled);
  //     } else {
  //       requestMicrophonePermissions();
  //     }
  //   };

  //   const toggleCamera = () => {
  //     if (!cameraState.hasBrowserPermission) {
  //       if (cameraEnabled) {
  //         call?.camera.disable();
  //       } else {
  //         call?.camera.enable();
  //       }
  //       setcameraEnabled(!cameraEnabled);
  //     } else {
  //       requestCameraPermissions();
  //     }
  //   };

  const [isMicToggleOn, setisMicToggleOn] = useState(false);
  const handleMicToggleOn = () => {
    setisMicToggleOn((prev) => !prev);
  };

  const [isCamToggleOn, setisCamToggleOn] = useState(false);
  const handleCamToggleOn = () => {
    setisCamToggleOn((prev) => !prev);
  };

  useEffect(() => {
    if (!isMicToggleOn) {
      call?.microphone.disable();
    } else {
      call?.microphone.enable();
    }
    if (!isCamToggleOn) {
      call?.camera.disable();
    } else {
      call?.camera.enable();
    }
  }, [isMicToggleOn, isCamToggleOn, call?.camera, call?.microphone]);

  const StartingCameraPreview = () => (
    <div>
      <Loader className="size-16 animate-spin text-muted-foreground" />
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-3 text-white bg-black">
      <div className="w-full fixed left-0 right-0 top-0">
        <div className="container mx-auto flex justify-between items-center py-4 ">
          <Link href={"/teacher/teacher"}>
            <Image
              src={"/images/logo-white.png"}
              alt="logo"
              width={150}
              height={100}
              className="w-[100px] md:w-[120px]"
            />
          </Link>
          <div className="flex items-center gap-2 bg-[#19232d] p-2 rounded-3xl">
            <Avatar className="rounded-full">
              <AvatarImage
                src={user?.teacher_profile ? user?.teacher_profile : ""}
              />
              <AvatarFallback className="text-black uppercase">
                {getInitialName(user?.fullname)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm  hidden md:block md:text-md capitalize">
              {user?.fullname}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col text-center gap-4 lg:w-1/2 mb-6 p-2">
        <h1 className="text-md font-semibold md:mt-0 mt-16">
          Configuration de votre séance avant de le commencer
        </h1>
        <p className="text-sm">
          Veuillez vous assurer que l’accès à votre caméra et à votre micro a
          bien été autorisé.
        </p>
      </div>
      <VideoPreview
        DisabledVideoPreview={ParticipantPlaceholder}
        NoCameraPreview={RequestPermissionPlaceholder}
        StartingCameraPreview={StartingCameraPreview}
        className="!w-[95%] !h-[280px] md:!h-[375px] md:!w-[300px] lg:!w-[400px] xl:!w-[500px]"
      />
      <div className="flex items-center gap-2 my-6">
        <div
          onClick={handleMicToggleOn}
          className={`p-3 cursor-pointer relative rounded-full flex justify-center items-center ${
            isMicToggleOn
              ? "bg-[#19232d] hover:bg-[#4c535b]"
              : "bg-red-500 hover:bg-red-300"
          }`}>
          {isMicToggleOn ? <Mic size={16} /> : <MicOff size={16} />}
        </div>
        <div
          onClick={handleCamToggleOn}
          className={`p-3 cursor-pointer relative rounded-full flex justify-center items-center ${
            isCamToggleOn
              ? "bg-[#19232d] hover:bg-[#4c535b]"
              : "bg-red-500 hover:bg-red-300"
          }`}>
          {isCamToggleOn ? <Video size={16} /> : <VideoOff size={16} />}
        </div>
        <DeviceSettings />
      </div>
      <div className="w-full flex flex-col justify-center items-center text-center">
        <p className="text-gray-300">
          {participantCount > 0
            ? `Il y a déjà quelqu'un dans la séance !`
            : "Vous le premier à arrivé !"}
        </p>
      </div>

      <div>
        <Button
          onClick={async () => {
            call?.join();
            setisSetupComplete(true);
          }}
          className="bg-green-500 px-4 py-2 hover:bg-green-600">
          Rejoindre la séance
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
