import { useCall } from "@stream-io/video-react-sdk";

export function useStreamCall() {
  const call = useCall();

  if (!call)
    throw new Error(
      "cet hook useStream doit etre utilisé sans un StreamCall component"
    );

  return call;
}
