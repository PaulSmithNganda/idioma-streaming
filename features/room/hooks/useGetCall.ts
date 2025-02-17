import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

export function useGetCall({ id }: Props) {
  const [call, setcall] = useState<Call | undefined>(undefined);
  const [isLoading, setisLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const getCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id: id,
          },
        });
        if (calls.length > 0) {
          setcall(calls[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };

    getCall();
  }, [client, id]);

  return { isLoading, call };
}
