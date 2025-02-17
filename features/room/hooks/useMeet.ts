import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { getToken } from "../actions";

type Props = {
  id: number;
  name: string;
  image: string;
};

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export function useMeet({ id, name, image }: Props) {
  const [client, setclient] = useState<StreamVideoClient | undefined>();

  useEffect(() => {
    if (!apiKey) throw new Error("Video API Key not found !");

    const client = new StreamVideoClient({
      apiKey: apiKey,
      user: {
        id: String(id),
        name: name,
        image: image,
      },
      tokenProvider: getToken,
    });

    setclient(client);

    return () => {
      client.disconnectUser();
      setclient(undefined);
    };
  }, [id, name, image]);

  return { client };
}
