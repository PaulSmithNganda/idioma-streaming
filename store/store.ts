/* eslint-disable @typescript-eslint/no-require-imports */
import { User } from "@/features/user/types";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Auth {
  token: string;
  refresh_token: string;
  user: User;
  isLogged: (data: { token: string; refresh_token: string }) => void;
  isLogout: () => void;
  isGetIdMeet: (data: { id: string }) => void;
  isRemoveIdMeet: () => void;
  meetid: string;
}

const getUserProfil = (token: string) => {
  const { jwtDecode } = require("jwt-decode");
  const user: User = jwtDecode(token);

  return user;
};

export const useAuthStore = create<Auth>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        refresh_token: "",
        meetid: "",
        with_remember: false,
        user: {
          id: 0,
          email: "",
          username: "",
          fullname: "",
          firstname: "",
          phone: "",
          isTeacher: false,
          teacher_id: 0,
          teacher_profile: "",
        },
        isLogged(data: { token: string; refresh_token: string }) {
          set({
            token: data.token,
            refresh_token: data.refresh_token,
            user: getUserProfil(data.token),
          });
        },
        isGetIdMeet(data: { id: string }) {
          set({
            meetid: data.id,
          });
        },
        isRemoveIdMeet() {
          set({
            meetid: "",
          });
        },
        isLogout() {
          set({
            token: "",
            refresh_token: "",
            user: {
              id: 0,
              email: "",
              username: "",
              fullname: "",
              firstname: "",
              phone: "",
              isTeacher: false,
              teacher_id: 0,
              teacher_profile: "",
            },
          });
        },
      }),
      {
        name: "@meet-auth", // name of the item in the storage (must be unique)
      }
    )
  )
);
