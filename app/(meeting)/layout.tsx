import MeetProvider from "@/features/room/provider/meet-provider";
import "../globals.css";

export default async function MeetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = useAuthStore.getState().user;
  // if (!user || user.id || user.fullname || user.teacher_profile)
  //   return redirect("/");

  // console.log("user2:", user);

  return (
    <div>
      <MeetProvider>{children}</MeetProvider>
    </div>
  );
}
