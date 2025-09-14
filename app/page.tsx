import {Skeleton} from "@/components/ui/skeleton";
import CardUser from "@/features/user/components/card.user";
import {Suspense} from "react";

export default function Page() {
    return (
        <div className="min-h-screen flex justify-center items-center p-4">
            <Suspense
                fallback={
                    <div className="w-full max-w-md mx-auto">
                        <Skeleton className="bg-gray-100 w-full h-96 rounded-xl"/>
                    </div>
                }>
                <CardUser/>
            </Suspense>
        </div>
    );
}
