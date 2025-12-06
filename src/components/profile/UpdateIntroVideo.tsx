"use client";

import { useProfileQuery } from "@/redux/features/auth/authApi";
import { ReactNextPlayer } from "reactnextplayer";

const UpdateIntroVideo = () => {
  const { data: profile, isLoading } = useProfileQuery("");
  if (isLoading) {
    return "loading....";
  }
  return (
    <div>
      {profile?.data?.introVideo ? (
        <ReactNextPlayer
          src={profile?.data?.introVideo}
          controls
          autoplay={true}
          muted={false}
          loop={false}
          height={500}
          width="100%"
          contextMenu={false}
        //   className="w-full rounded-2xl"
          color="#ff0000"
          ambientGlow
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default UpdateIntroVideo;
