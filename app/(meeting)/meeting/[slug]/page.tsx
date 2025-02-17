import MeetConfig from "@/features/room/components/meet.config";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <MeetConfig slug={slug} />;
}
