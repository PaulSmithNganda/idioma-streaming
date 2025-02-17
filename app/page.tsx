import { Skeleton } from "@/components/ui/skeleton";
import CardUser from "@/features/user/components/card.user";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Suspense
        fallback={
          <div>
            <Skeleton className="bg-white w-full h-44" />
          </div>
        }>
        <CardUser />
      </Suspense>
    </div>
  );
}
