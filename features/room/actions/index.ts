"use server";

import { StreamClient } from "@stream-io/node-sdk";
import { useAuthStore } from "@/store/store";

const STREM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_SECRET_KEY = process.env.STREAM_SECRET_KEY;

export const getToken = async () => {
  const user = await useAuthStore.getState().user;

  if (!user || user.id || user.fullname || user.teacher_profile)
    throw new Error("User not found !");

  if (!STREM_API_KEY) throw new Error("Video API Key not found !");
  if (!STREAM_SECRET_KEY) throw new Error("Video Secret API Key not found !");

  const client = new StreamClient(STREM_API_KEY, STREAM_SECRET_KEY);

  const expirationTime = Math.floor(Date.now() / 1000) + 5400;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = client.generateUserToken({
    user_id: String(user.id),
    exp: expirationTime,
    iat: issuedAt,
  });

  return token;
};
