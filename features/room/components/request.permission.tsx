"use client";

import { MicOff, VideoOff } from "lucide-react";
import React from "react";

const RequestPermissionPlaceholder = () => (
  <div className="flex items-center gap-2">
    <div className="p-4 relative rounded-full flex justify-center items-center bg-red-500">
      <MicOff size={16} />
    </div>
    <div className="p-4 relative rounded-full flex justify-center items-center bg-red-500">
      <VideoOff size={16} />
    </div>
  </div>
);

export default RequestPermissionPlaceholder;
