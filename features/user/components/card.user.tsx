"use client";

import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Card} from "@/components/ui/card";
import {useDecodeUser} from "../hooks/useDecodeUser";
import {User} from "../types";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getInitialName} from "../helpers";
import {Button} from "@/components/ui/button";
import {useAuthStore} from "@/store/store";
import {Loader, Video, Users} from "lucide-react";

const CardUser = () => {
    const {isLogged, isGetIdMeet} = useAuthStore((state) => state);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();

    const token = searchParams.get("user");
    const meetid = searchParams.get("meetid");

    const user: User = useDecodeUser(token as string);

    if (!token) {
        return <div>{"Nous n'arrivons pas à vous identifier"}</div>;
    }

    const handleJoinMeeting = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push(`/meeting/${meetid}`);
            isLogged({token: token, refresh_token: token});
            isGetIdMeet({id: meetid as string});
        }, 2000);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <Card className="p-8 border-0 shadow-sm bg-white/95">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <Video className="w-8 h-8 text-gray-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Rejoindre le Meeting</h1>
                    <p className="text-gray-600 font-medium">Plateforme de streaming Idioma</p>
                </div>

                {/* User Info Section */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={user.teacher_profile as string} alt={user.fullname}/>
                        <AvatarFallback className="bg-gray-200 text-gray-700 font-semibold">
                            {getInitialName(user.fullname)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{user.fullname}</h3>
                        <p className="text-sm text-gray-600">Participant</p>
                    </div>
                </div>

                {/* Meeting Info */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 text-gray-700 mb-2">
                        <Users className="w-5 h-5" />
                        <span className="font-semibold">ID Meeting: {meetid}</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-8">
                        Vous êtes sur le point de rejoindre la session
                    </p>
                </div>

                {/* Action Button */}
                <Button 
                    onClick={handleJoinMeeting}
                    className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-colors"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <Loader className="animate-spin w-4 h-4" />
                            <span>Connexion...</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            <span>Rejoindre maintenant</span>
                        </div>
                    )}
                </Button>
            </Card>
        </div>
    );
};

export default CardUser;
